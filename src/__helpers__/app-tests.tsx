import React, { useEffect, ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import nock from 'nock'

import { clearToken, setToken } from 'client'
import { AppLayout } from 'ui'

type Options = {
  initialRoute?: string
  initialRoutePath?: string
  authenticated?: boolean
  queryClient?: QueryClient
  routePaths?: string[]
}

type Props = {
  children?: ReactNode
}

function render(
  ui: ReactElement,
  {
    initialRoute = '/',
    initialRoutePath = '/',
    queryClient = new QueryClient(),
    authenticated = true,
    routePaths,
  }: Options = {},
) {
  function Wrapper({ children }: Props) {
    useEffect(() => {
      if (authenticated) {
        setToken(uuid())

        return () => {
          clearToken()
        }
      }
    }, [])

    function MockedPage({ title }: { title: string }) {
      if (authenticated) {
        return (
          <AppLayout>
            <AppLayout.Content>Page {title}</AppLayout.Content>
          </AppLayout>
        )
      }

      return <h1>Page {title}</h1>
    }

    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path={initialRoutePath} element={children} />
            {routePaths?.map((routePath) => (
              <Route
                key={routePath}
                path={routePath}
                element={<MockedPage title={routePath} />}
              />
            ))}
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
  }

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
    }),
  }
}

export * from '@testing-library/react'
export { render, userEvent, nock }

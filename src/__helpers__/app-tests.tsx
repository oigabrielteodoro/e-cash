import React, { useEffect, ReactElement, ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DefaultOptions,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ToastContainer } from 'react-toastify'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import nock from 'nock'

import { pipe } from 'fp-ts/function'
import { TaskEither, map, mapLeft } from 'fp-ts/TaskEither'

import { AppLayout } from 'ui'
import { clearToken, queryConfigDefault, setToken } from 'client'

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

type Callback = (result: unknown) => unknown
type MapAll = (
  fn: Callback,
) => (data: TaskEither<unknown, unknown>) => TaskEither<unknown, unknown>

const queryCache = new QueryCache()
const defaultQueryClient = new QueryClient({
  defaultOptions: queryConfigDefault as DefaultOptions,
  queryCache: queryCache,
})

function render(
  ui: ReactElement,
  {
    initialRoute = '/',
    queryClient = defaultQueryClient,
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
            <Route path={initialRoute} element={children} />
            {routePaths?.map((routePath) => (
              <Route
                key={routePath}
                path={routePath}
                element={<MockedPage title={routePath} />}
              />
            ))}
          </Routes>
        </MemoryRouter>

        <ToastContainer />
      </QueryClientProvider>
    )
  }

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
    }),
  }
}

export function unsafe<T>(value: unknown) {
  return value as T
}

export const mapAll: MapAll = (fn) => (data) => {
  return pipe(data, map(fn), mapLeft(fn))
}

export function getErrorMessage(errors: unknown): string {
  return Array.isArray(errors) ? errors[0].message : ''
}

export * from '@testing-library/react'
export {
  render,
  userEvent,
  nock,
  defaultQueryClient as queryClient,
  queryCache,
}

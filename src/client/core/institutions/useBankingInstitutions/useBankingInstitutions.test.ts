import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'

import { baseURL } from 'config'

import { bankingInstitutionFactory } from '__factories__'
import { ReactQueryWrapper } from '__helpers__/app-tests'

import { useBankingInstitutions } from '.'

describe('useInstitutions', () => {
  it('should be able return institutions successfully', async () => {
    const institutions = bankingInstitutionFactory.buildList(10)

    const institutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, institutions)

    const { result, waitFor } = renderHook(() => useBankingInstitutions(), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => expect(institutionsMock).mockToBeDone())

    expect(result.current.bankingInstitutions).toStrictEqual(institutions)
  })

  it('should be able return error when request is fails', async () => {
    const institutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(404)

    const { result, waitFor } = renderHook(() => useBankingInstitutions(), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => expect(institutionsMock).mockToBeDone())

    expect(result.current.isError).toBeTruthy()
  })
})

import * as yup from 'yup'

import { onlyNumbers } from 'lib/matcher'

const account = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  bankingInstitutionId: yup.string().required().matches(onlyNumbers),
  balance: yup.string().required().matches(onlyNumbers),
  category: yup.string().required(),
  agencyNumber: yup.string().required().matches(onlyNumbers),
  accountNumber: yup.string().required().matches(onlyNumbers),
  includeSumOnDashboard: yup.bool().optional(),
  bankingInstitution: yup
    .object()
    .shape({
      id: yup.string().optional().matches(onlyNumbers),
      name: yup.string().optional(),
      imageUrl: yup.string().optional(),
      institutionName: yup.string().optional(),
      institutionUrl: yup.string().optional().url(),
    })
    .optional(),
})

export const accountsSchema = yup.array(account)

export type AccountFormParams = {
  name: string
  bankingInstitutionId: string
  balance: string
  category: string
  agencyNumber: string
  accountNumber: string
  includeSumOnDashboard?: boolean
}

export type Account = {
  id: string
  name: string
  bankingInstitutionId: string
  balance: string
  category: string
  agencyNumber: string
  accountNumber: string
  includeSumOnDashboard: boolean
  bankingInstitution?: {
    imageUrl: string
    institutionName: string
  }
}

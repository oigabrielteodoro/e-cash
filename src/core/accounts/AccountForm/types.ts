import * as yup from 'yup'

import { onlyNumbers } from 'lib/matcher'

export const accountSchema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  banking_institution_id: yup.string().required('Banking is a required field'),
  balance: yup
    .string()
    .required('Balance is a required field')
    .matches(onlyNumbers, 'Use only numbers'),
  category: yup.string().required('Category is a required field'),
  banking_agency: yup
    .string()
    .required('Agency is a required field')
    .matches(onlyNumbers, 'Use only numbers'),
  banking_account: yup
    .string()
    .required('Account is a required field')
    .matches(onlyNumbers, 'Use only numbers'),
  description: yup
    .string()
    .optional()
    .max(250, 'Description has a maximum length of 250 characters'),
})

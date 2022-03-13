import * as yup from 'yup'

import { onlyNumbers } from 'lib/matcher'

const contactShape = {
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email must be a valid email'),
  fullName: yup.string().required('Full name is a required field'),
}

const passwordShape = {
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be 6 characters long')
    .matches(/[A-Z]/, 'Password must have an uppercase character')
    .matches(/[a-z]/, 'Password must have an lowercase character')
    .matches(/[0-9]/, 'Password must have a number')
    .matches(/[a-zA-Z]/, 'Password must have a text')
    .matches(/[^A-Z a-z0-9]/, 'Password must have a symbol'),
}

const profileShape = {
  monthlyIncome: yup
    .string()
    .required('Monthly income is a required field')
    .matches(onlyNumbers, 'Use only numbers'),
  financialObjective: yup
    .string()
    .required('Financial objective is a required field'),
  likeBeCalled: yup.string().required('Like be called is a required field'),
}

export const contactSchema = yup.object().shape(contactShape)
export const passwordSchema = yup.object().shape(passwordShape)
export const profileSchema = yup.object().shape(profileShape)

export const createUserSchema = yup.object().shape({
  ...contactShape,
  ...passwordShape,
  ...profileShape,
})

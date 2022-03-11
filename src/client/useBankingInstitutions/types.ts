import * as yup from 'yup'

const bankingInstitution = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  imageUrl: yup.string().required(),
  institutionName: yup.string().required(),
})

export const bankingInstitutionsSchema = yup.array(bankingInstitution)

export type BankingInstitution = {
  id: number
  name: string
  imageUrl: string
  institutionName: string
}

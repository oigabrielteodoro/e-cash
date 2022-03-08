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

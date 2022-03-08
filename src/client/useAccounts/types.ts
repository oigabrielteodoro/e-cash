export type AccountFormParams = {
  name: string
  banking_institution_id: string
  balance: string
  category: string
  banking_agency: string
  banking_account: string
  include_sum_on_dashboard?: boolean
}

export type Account = {
  id: string
  name: string
  banking_institution_id: string
  balance: string
  category: string
  banking_agency: string
  banking_account: string
  include_sum_on_dashboard: boolean
  banking_institution?: {
    imageUrl: string
    institutionName: string
  }
}

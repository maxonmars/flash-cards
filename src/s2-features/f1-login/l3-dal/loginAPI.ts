import { instance } from '../../../s1-main/m3-dal/instance'
import { FormikValuesType } from '../l1-ui/u1-login/LoginContainer'

export const loginAPI = {
   login: (data: FormikValuesType) => {
      return instance.post<ResType>('auth/login', data)
   },
   logout: () => {
      return instance.delete('auth/me')
   },
   me: () => {
      return instance.post<ResType>('auth/me', {})
   },
}

export type ResType = {
   _id: string
   email: string
   name: string
   avatar?: string
   publicCardPacksCount: number
   created: Date
   updated: Date
   isAdmin: boolean
   verified: boolean
   rememberMe: boolean
   error: string
}

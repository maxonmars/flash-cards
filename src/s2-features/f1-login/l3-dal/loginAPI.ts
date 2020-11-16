import { instance } from '../../../s1-main/m3-dal/instance'
import { FormikValuesType } from '../l1-ui/u1-login/LoginContainer'

export type ResponseType = {
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

export const loginAPI = {
   login: (data: FormikValuesType) => {
      return instance.post<ResponseType>('auth/login', data)
   },
   logout: () => {
      return instance.delete('auth/me')
   },
   me: () => {
      return instance.post<ResponseType>('auth/me', {})
   },
}

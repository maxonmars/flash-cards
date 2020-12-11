import { instance, ResType } from '../../../s1-main/m3-dal/instance'
import { FormikValuesType } from '../l1-ui/u1-login/LoginContainer'

export const loginAPI = {
   login: async (data: FormikValuesType) => {
      const response = await instance.post<ResType>('auth/login', data)
      return response.data
   },
   logout: async () => {
      return await instance.delete('auth/me')
   },
   me: async () => {
      const response = await instance.post<ResType>('auth/me')
      return response.data
   },
   setPhoto: async (avatar: string | ArrayBuffer | null, name: string) => {
      const response = await instance.put('auth/me', { avatar, name })
      return response.data
   },
}

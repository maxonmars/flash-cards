import { instance, ResType } from '../../../s1-main/m3-dal/instance'

export const registrationAPI = {
   setRegister: async (email: string, password: string) => {
      const result = await instance.post<ResType>('auth/register', { email, password })
      return result.data
   },
}

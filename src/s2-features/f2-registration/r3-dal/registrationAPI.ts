import { instance } from '../../../s1-main/m3-dal/instance'

export const registrationAPI = {
   setRegister: (email: string, password: string) => {
      return instance
         .post<ResType>('auth/register', { email, password })
         .then((data) => data.data)
   },
}

type ResType = {
   addedUser: {}
}

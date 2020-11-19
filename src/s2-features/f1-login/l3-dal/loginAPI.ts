import { instance, ResType } from '../../../s1-main/m3-dal/instance'
import { FormikValuesType } from '../l1-ui/u1-login/LoginContainer'

export const loginAPI = {
   login: (data: FormikValuesType) => {
      return instance.post<ResType>('auth/login', data).then((data) => data.data)
   },
   logout: () => {
      return instance.delete<{ info: string }>('auth/me')
   },
   me: () => {
      return instance.post<ResType>('auth/me')
   },
}

import { instance } from '../../../s1-main/m3-dal/instance'

export const updatePassAPI = {
   updatePass: (email: string, resetToken: string) => {
      return instance.post('/auth/set-new-password', { email, resetToken })
   },
}

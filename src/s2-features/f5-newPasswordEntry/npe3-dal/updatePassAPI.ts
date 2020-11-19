import { instance } from '../../../s1-main/m3-dal/instance'

export const updatePassAPI = {
   updatePass: (password: string, resetPasswordToken: string) => {
      return instance.post('/auth/set-new-password', { password, resetPasswordToken })
   },
}

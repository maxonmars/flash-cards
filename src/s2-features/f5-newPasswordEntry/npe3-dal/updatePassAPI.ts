import { instance } from '../../../s1-main/m3-dal/instance'

export const updatePassAPI = {
   updatePass: async (password: string, resetPasswordToken: string) => {
      const response = await instance.post('/auth/set-new-password', { password, resetPasswordToken })
      return response.data
   },
}

import { instance } from '../../../s1-main/m3-dal/instance'

const messageView = (token: string) => {
   return `<div style="background-color: #00ff00; padding: 15px"><a href=http://localhost:3000/#/set-new-password/${token}'>Ссылка на восстановление пароля</a></div>`
}
const messageMelivaro = (token: string) => {
   return `<div style="background-color: #00ff00; padding: 15px"><a href=https://melivaro.github.io/flash-cards/#/set-new-password/${token}'>Ссылка на восстановление пароля</a></div>`
}

export const passRecoveryAPI = {
   recovery: async (email: string) => {
      const response = await instance.post('/auth/forgot', {
         email,
         from: 'mymailtolaaa@gmail.com',
         message: messageMelivaro('$token$'),
      })
      return response.data
   },
}

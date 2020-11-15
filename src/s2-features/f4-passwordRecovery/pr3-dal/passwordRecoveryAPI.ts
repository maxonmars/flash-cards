import { instance } from '../../../s1-main/m3-dal/instance'

// const messageView = () => {
//    return  (`<div style="background-color: lime; padding: 15px">
//             <a href='http://localhost:3000/#/set-new-password/$token$'>
//             link</a></div>`)
// }

export const passRecoveryAPI = {
   recovery: (email: string) => {
      return instance.post('/auth/forgot', { email, from: 'mymailtolaaa@gmail.com' })
   },
}

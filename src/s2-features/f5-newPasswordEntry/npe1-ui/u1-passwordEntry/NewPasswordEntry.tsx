import React, { ChangeEvent } from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'

type NewPasswordEntryType = {
   newPass: string
   confirmPass: string
   changeNewPass: (e: ChangeEvent<HTMLInputElement>) => void
   changeConfirmPass: (e: ChangeEvent<HTMLInputElement>) => void
   resultData: string
   isUpdate: boolean
   buttonSubmit: () => void
}

export const NewPasswordEntry: React.FC<NewPasswordEntryType> = ({
   newPass,
   confirmPass,
   changeNewPass,
   changeConfirmPass,
   resultData,
   isUpdate,
   buttonSubmit,
}) => {
   if (isUpdate) {
      return <Redirect to={PATH.LOGIN} />
   }

   return (
      <div>
         <span>{resultData}</span>
         <SuperInputText placeholder={'Укажите новый пароль'} value={newPass} onChange={changeNewPass} />
         <SuperInputText placeholder={'Повторите ввод пароля'} value={confirmPass} onChange={changeConfirmPass} />
         <SuperButton onClick={buttonSubmit}>Изменить пароль</SuperButton>
      </div>
   )
}

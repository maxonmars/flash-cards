import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { actions, recoverThunks } from '../../pr2-bll/passwordRecoveryReducer'
import { PasswordRecovery } from './PasswordRecovery'

export const PasswordRecoveryContainer = () => {
   const recoveryResult = useSelector<AppStateType, string>((state) => state.passRecovery.result)
   const inputText = useSelector<AppStateType, string>((state) => state.passRecovery.inputText)

   const dispatch = useDispatch()

   const [pending, setPending] = useState(false)

   const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.recoverPassAC(e.currentTarget.value))
   }
   const buttonClickHandler = async () => {
      setPending(true)
      await dispatch(recoverThunks.sendEmailTC(inputText))
      setPending(false)
   }
   return (
      <PasswordRecovery
         pending={pending}
         inputText={inputText}
         result={recoveryResult}
         inputHandler={inputChangeHandler}
         buttonClickHandler={buttonClickHandler}
      />
   )
}

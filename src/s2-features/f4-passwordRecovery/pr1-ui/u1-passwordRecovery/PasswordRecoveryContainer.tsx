import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { actions, recoverThunks } from '../../pr2-bll/passwordRecoveryReducer'
import { PasswordRecovery } from './PasswordRecovery'

export const PasswordRecoveryContainer = () => {
   const recoveryResult = useSelector<AppStateType, string>((state) => state.passRecovery.result)
   const inputText = useSelector<AppStateType, string>((state) => state.passRecovery.inputText)

   const dispatch = useDispatch()

   const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.recoverPassAC(e.currentTarget.value))
   }
   const buttonClickHandler = () => {
      dispatch(recoverThunks.sendEmailTC(inputText))
   }
   return (
      <PasswordRecovery
         inputText={inputText}
         result={recoveryResult}
         inputHandler={inputChangeHandler}
         buttonClickHandler={buttonClickHandler}
      />
   )
}

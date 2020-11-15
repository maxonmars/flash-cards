import React, { ChangeEvent } from 'react'
import { SuperInputText } from '../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../s1-main/m2-bll/store'
import {
   actions,
   InitialStateRecoveryType,
   recoverThunks,
} from '../../f4-passwordRecovery/pr2-bll/passwordRecoveryReducer'

export const NewPasswordEntryPage = () => {
   const recovery = useSelector<AppStateType, string>((state) => state.passRecovery.result)
   const inputText = useSelector<AppStateType, string>((state) => state.passRecovery.inputText)

   const dispatch = useDispatch()

   const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.recoverPassAC(e.currentTarget.value))
   }
   const buttonClickHandler = () => {
      dispatch(recoverThunks.sendEmailTC(inputText))
   }

   return (
      <div>
         <span>Восстановление пароля</span>
         <p>{recovery}</p>
         <div>
            <SuperInputText value={inputText} onChange={inputChangeHandler} />
            <SuperButton onClick={buttonClickHandler}>Отправить</SuperButton>
         </div>
      </div>
   )
}

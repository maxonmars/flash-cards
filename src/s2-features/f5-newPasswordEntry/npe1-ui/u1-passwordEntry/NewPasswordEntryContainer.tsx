import React, { ChangeEvent, useEffect, useState } from 'react'
import { NewPasswordEntry } from './NewPasswordEntry'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { useParams } from 'react-router-dom'
import { actionsUpdate, updatePasswordTC } from '../../npe2-bll/updatePasswordReducer'

export const NewPasswordEntryContainer = () => {
   const [newPass, setNewPass] = useState<string>('')
   const [confirmPass, setConfirmPass] = useState<string>('')
   const dispatch = useDispatch()
   const result = useSelector<AppStateType, string>((state) => state.updatePass.result)
   const isUpdate = useSelector<AppStateType, boolean>((state) => state.updatePass.passIsUpdated)
   const { token } = useParams<{ token: string }>()

   const buttonSubmit = () => {
      if (newPass === confirmPass) {
         dispatch(updatePasswordTC.updatePass(newPass, token))
      } else {
         dispatch(actionsUpdate.passUpdateResultAC('Пороли не совпадают!'))
      }
   }

   const ChangeConfirmPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPass(e.currentTarget.value)
   }
   const ChangeNewPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewPass(e.currentTarget.value)
   }

   return (
      <NewPasswordEntry
         newPass={newPass}
         confirmPass={confirmPass}
         changeConfirmPass={ChangeConfirmPassHandler}
         changeNewPass={ChangeNewPassHandler}
         resultData={result}
         isUpdate={isUpdate}
         buttonSubmit={buttonSubmit}
      />
   )
}

import React, { ChangeEvent, useState } from 'react'
import { NewPasswordEntry } from './NewPasswordEntry'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { useParams } from 'react-router-dom'
import { actionsUpdate, updatePasswordTC } from '../../npe2-bll/updatePasswordReducer'
import { useFormik } from 'formik'

export type FormValues = {
   password: string
   confirmPassword: string
}

export type FormErrorValues = {
   password?: string
   confirmPassword?: string
}

export const NewPasswordEntryContainer = () => {
   const dispatch = useDispatch()
   const result = useSelector<AppStateType, string>((state) => state.updatePass.result)
   const isUpdate = useSelector<AppStateType, boolean>((state) => state.updatePass.passIsUpdated)
   const { token } = useParams<{ token: string }>()

   const formik = useFormik({
      initialValues: {
         password: '',
         confirmPassword: '',
      },
      validate: (values) => {
         const { password, confirmPassword } = values
         const errors: FormErrorValues = {}
         if (!password) {
            errors.password = 'Password is required'
         }
         if (!confirmPassword) {
            errors.password = 'Password is required'
         }
         if (password.length < 8) {
            errors.password = 'Пароль не может быть меньше восьми символов'
         }
         if (confirmPassword.length < 8) {
            errors.confirmPassword = 'Пароль не может быть меньше восьми символов'
         }
         return errors
      },
      onSubmit: (values) => {
         const { password, confirmPassword } = values
         if (password === confirmPassword) {
            dispatch(updatePasswordTC.updatePass(password, token))
         } else {
            dispatch(actionsUpdate.passUpdateResultAC('Пороли не совпадают!'))
         }
      },
   })

   return <NewPasswordEntry resultData={result} isUpdate={isUpdate} formik={formik} />
}

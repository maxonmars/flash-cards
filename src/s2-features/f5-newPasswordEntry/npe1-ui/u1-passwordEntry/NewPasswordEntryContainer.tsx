import React from 'react'
import { NewPasswordEntry } from './NewPasswordEntry'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { Redirect, useParams } from 'react-router-dom'
import { actionsUpdate, updatePasswordTC } from '../../npe2-bll/updatePasswordReducer'
import { FormikErrors, useFormik } from 'formik'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'

export type FormValues = {
   password: string
   confirmPassword: string
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
         const errors: FormikErrors<FormValues> = {}
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

   if (isUpdate) {
      return <Redirect to={PATH.LOGIN} />
   }

   return <NewPasswordEntry resultData={result} formik={formik} />
}

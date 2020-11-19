import React, { useEffect } from 'react'
import { Registration } from './Registration'
import { FormikErrors, useFormik } from 'formik'
import { actions, thunks } from '../../r2-bll/registrationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { Redirect } from 'react-router-dom'

export type FormValues = {
   email: string
   password: string
   confirmPassword: string
}

export const RegistrationContainer = () => {
   const isSuccessRegister = useSelector<AppStateType, boolean>((state) => state.registration.isSuccessRegister)
   const serverErrors = useSelector<AppStateType, string>((state) => state.registration.error)
   const dispatch = useDispatch()
   useEffect(() => {
      if (isSuccessRegister) {
         return () => {
            dispatch(actions.toggleSuccessRegister(false))
            dispatch(actions.setError(''))
         }
      }
   }, [isSuccessRegister, dispatch])

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         confirmPassword: '',
      },
      validate: (values: FormValues) => {
         const errors: FormikErrors<FormValues> = {}
         if (!values.email) {
            errors.email = 'Email is required'
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
         }
         if (!values.password) {
            errors.password = 'Password is required'
         } else if (values.password.length <= 7) {
            errors.password = 'Password must be more than 7 characters'
         }
         if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required'
         } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match'
         }
         return errors
      },
      onSubmit: async (values: FormValues) => {
         const { password, email } = values
         await dispatch(thunks.accountCreation(email, password))
      },
   })

   if (isSuccessRegister) {
      return <Redirect to={'/login'} />
   }

   return (
      <div>
         <Registration serverErrors={serverErrors} formik={formik} />
      </div>
   )
}

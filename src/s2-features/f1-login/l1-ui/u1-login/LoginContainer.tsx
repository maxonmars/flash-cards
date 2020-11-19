import React from 'react'
import { Login } from './Login'
import { FormikErrors, useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { thunks } from '../../l2-bll/loginReducer'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'

export type FormikValuesType = {
   email: string
   password: string
   rememberMe: boolean
}

export const LoginContainer = () => {
   const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.login.isLoggedIn)
   const error = useSelector<AppStateType, string | null>((state) => state.login.error)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
      validate: (values) => {
         const errors: FormikErrors<FormikValuesType> = {}
         if (!values.email) {
            errors.email = 'Email is required'
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
         }
         if (!values.password) {
            errors.password = 'Password is required'
         }
         return errors
      },
      onSubmit: async (values: FormikValuesType, onSubmitProps) => {
         onSubmitProps.setSubmitting(true)
         await dispatch(thunks.loginTC(values))
         onSubmitProps.setSubmitting(false)
      },
   })

   if (isLoggedIn) {
      return <Redirect to={PATH.PROFILE} />
   }

   return <Login formik={formik} error={error} />
}

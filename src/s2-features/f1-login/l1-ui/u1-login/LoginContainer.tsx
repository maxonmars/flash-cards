import React, { useEffect, useCallback, useMemo } from 'react'
import { Login } from './Login'
import { FormikErrors, useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { actions, thunks } from '../../l2-bll/loginReducer'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'

export type FormikValuesType = {
   email: string
   password: string
   rememberMe: boolean
}

export const LoginContainer = () => {
   const isLoggedIn = useSelector<AppStateType, string>((state) => state.login.isLoggedIn)
   const error = useSelector<AppStateType, string>((state) => state.login.error)
   const dispatch = useDispatch()
   useEffect(() => {
      if (error) {
         return () => {
            dispatch(actions.setErrorAC(''))
         }
      }
   }, [error, dispatch])

   const formik = useFormik({
      initialValues: { email: '', password: '', rememberMe: false },
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
      onSubmit: async (values: FormikValuesType) => {
         await dispatch(thunks.loginTC(values))
      },
   })

   if (isLoggedIn === 'logged') {
      return <Redirect to={PATH.PROFILE} />
   }

   return <Login formik={formik} error={error} />
}

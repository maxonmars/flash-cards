import React from 'react'
import { Registration } from './Registration'
import { useFormik } from 'formik'
import { thunks } from '../../r2-bll/registrationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'

export const RegistrationContainer = () => {
   const isRegistration = useSelector<AppStateType, boolean>((state) => state.registration.isRegistration)
   const error = useSelector<AppStateType, string>((state) => state.registration.error)
   const dispatch = useDispatch()

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         confirmPassword: '',
      },
      onSubmit: (values) => {
         const { email, password } = values
         dispatch(thunks.accountCreation(email, password))
      },
   })

   return (
      <div>
         <Registration error={error} isRegistration={isRegistration} formik={formik} />
      </div>
   )
}

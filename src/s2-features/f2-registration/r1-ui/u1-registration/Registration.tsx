import { FormikProps } from 'formik'
import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'

type FormValues = {
   email: string
   password: string
   confirmPassword: string
}

type PropsTypes = {
   formik: FormikProps<FormValues>
   isRegistration: boolean
   error: string
}

export const Registration: FC<PropsTypes> = ({ formik, isRegistration, error }) => {
   if (isRegistration) {
      return <Redirect to={'/login'} />
   }

   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            <SuperInputText {...formik.getFieldProps('email')} />
            <SuperInputText {...formik.getFieldProps('password')} />
            <SuperInputText {...formik.getFieldProps('confirmPassword')} />
            <SuperButton children={'submit'} />
            {error ? <div style={{ color: '#fff' }}>{error}</div> : ''}
         </form>
      </div>
   )
}

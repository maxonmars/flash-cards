import { FormikProps } from 'formik'
import React, { FC } from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { FormValues } from './RegistrationContainer'

type PropsTypes = {
   formik: FormikProps<FormValues>
   serverErrors: string
}

export const Registration: FC<PropsTypes> = ({ formik, serverErrors }) => {
   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor='email'>Email Address</label>
            <SuperInputText id='email' {...formik.getFieldProps('email')} />
            {formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
            <label htmlFor='password'>Password</label>
            <SuperInputText id='password' {...formik.getFieldProps('password')} />
            {formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <SuperInputText id='confirmPassword' {...formik.getFieldProps('confirmPassword')} />
            {formik.errors.confirmPassword && <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>}
            <SuperButton children={'submit'} disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting} />
            {serverErrors && <div style={{ color: '#fff' }}>{serverErrors}</div>}
         </form>
      </div>
   )
}

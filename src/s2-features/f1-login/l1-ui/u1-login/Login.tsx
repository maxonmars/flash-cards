import React from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { FormikProps } from 'formik'
import { SuperCheckbox } from '../../../../s1-main/m1-ui/u0-common/c3-SuperCheckbox/SuperCheckbox'
import { FormikValuesType } from './LoginContainer'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import { NavLink } from 'react-router-dom'

type LoginPropsType = {
   formik: FormikProps<FormikValuesType>
   error: string
}

export const Login = ({ formik, error }: LoginPropsType) => {
   return (
      <>
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor='email'>Email Address</label>
            <SuperInputText id='email' type='email' {...formik.getFieldProps('email')} />
            {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
            <label htmlFor='password'>Password</label>
            <SuperInputText id='password' type='password' {...formik.getFieldProps('password')} />
            {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <label htmlFor='rememberMe'>Remember Me</label>
            <SuperCheckbox id='rememberMe' {...formik.getFieldProps('rememberMe')} />
            <SuperButton
               type='submit'
               disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
               children={'Login'}
            />
         </form>
         <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
         <span>/</span>
         <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery</NavLink>
      </>
   )
}

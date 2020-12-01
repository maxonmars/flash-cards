import React from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { FormikProps } from 'formik'
import { SuperCheckbox } from '../../../../s1-main/m1-ui/u0-common/c3-SuperCheckbox/SuperCheckbox'
import { FormikValuesType } from './LoginContainer'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'

type LoginPropsType = {
   formik: FormikProps<FormikValuesType>
   error: string
}

const Login: React.FC<LoginPropsType> = React.memo(({ formik, error }) => {
   console.log('render')
   return (
      <>
         <form style={{ marginTop: '20px' }} onSubmit={formik.handleSubmit}>
            {formik.isSubmitting ? (
               <Loader />
            ) : (
               <>
                  <label htmlFor='email'>Email Address</label>
                  <SuperInputText id='email' type='email' {...formik.getFieldProps('email')} />
                  {formik.errors.email && <Error textError={formik.errors.email} />}
                  <label htmlFor='password'>Password</label>
                  <SuperInputText id='password' type='password' {...formik.getFieldProps('password')} />
                  {formik.errors.password && <Error textError={formik.errors.password} />}
                  {error && <Error textError={error} />}
                  <SuperCheckbox id='rememberMe' {...formik.getFieldProps('rememberMe')} children={'Remember Me'} />
               </>
            )}
            <SuperButton type='submit' disabled={!formik.isValid || formik.isSubmitting} children={'Login'} />
         </form>
         <div>
            <NavLink style={{ marginRight: '60px' }} to={PATH.REGISTRATION}>
               Registration
            </NavLink>
            <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery</NavLink>
         </div>
      </>
   )
})

export const LoginWithMemo = React.memo(Login, (props, nextProps) => {
   return props.formik.values === nextProps.formik.values && props.formik.errors === nextProps.formik.errors
})

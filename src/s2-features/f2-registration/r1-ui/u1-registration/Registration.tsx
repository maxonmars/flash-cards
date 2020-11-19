import { FormikProps } from 'formik'
import React, { FC } from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { FormValues } from './RegistrationContainer'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import { ReactComponent as Loader } from './../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

type PropsTypes = {
   formik: FormikProps<FormValues>
   serverErrors: string
}

export const Registration: FC<PropsTypes> = ({ formik, serverErrors }) => {
   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            {formik.isSubmitting ? (
               <Loader />
            ) : (
               <>
                  <label htmlFor='email'>Email Address</label>
                  <SuperInputText id='email' {...formik.getFieldProps('email')} />
                  {formik.errors.email && <Error textError={formik.errors.email} />}
                  <label htmlFor='password'>Password</label>
                  <SuperInputText id='password' {...formik.getFieldProps('password')} />
                  {formik.errors.password && <Error textError={formik.errors.password} />}
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <SuperInputText id='confirmPassword' {...formik.getFieldProps('confirmPassword')} />
                  {formik.errors.confirmPassword && <Error textError={formik.errors.confirmPassword} />}
                  <SuperButton
                     children={'submit'}
                     disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                  />
                  {serverErrors && <Error textError={serverErrors} />}
               </>
            )}
         </form>
      </div>
   )
}

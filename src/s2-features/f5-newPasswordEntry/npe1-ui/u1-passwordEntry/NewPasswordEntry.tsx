import React from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { FormikProps } from 'formik'
import { FormValues } from './NewPasswordEntryContainer'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'

type NewPasswordEntryType = {
   resultData: string
   formik: FormikProps<FormValues>
}

export const NewPasswordEntry: React.FC<NewPasswordEntryType> = ({ resultData, formik }) => {
   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            {formik.isSubmitting ? (
               <Loader />
            ) : (
               <>
                  <span>{resultData}</span>
                  <SuperInputText placeholder={'Укажите новый пароль'} {...formik.getFieldProps('password')} />
                  {formik.errors.password && <Error textError={formik.errors.password} />}
                  <SuperInputText placeholder={'Повторите ввод пароля'} {...formik.getFieldProps('confirmPassword')} />
                  {formik.errors.confirmPassword && <Error textError={formik.errors.confirmPassword} />}
               </>
            )}
            <SuperButton
               children={'Изменить пароль'}
               type={'submit'}
               disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            />
         </form>
      </div>
   )
}

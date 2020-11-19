import React from 'react'
import { SuperInputText } from '../../../../s1-main/m1-ui/u0-common/c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../../../s1-main/m1-ui/u0-common/c2-SuperButton/SuperButton'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import { FormikProps } from 'formik'
import { FormValues } from './NewPasswordEntryContainer'

type NewPasswordEntryType = {
   resultData: string
   isUpdate: boolean
   formik: FormikProps<FormValues>
}

export const NewPasswordEntry: React.FC<NewPasswordEntryType> = ({ resultData, isUpdate, formik }) => {
   if (isUpdate) {
      return <Redirect to={PATH.LOGIN} />
   }

   return (
      <div>
         <form onSubmit={formik.handleSubmit}>
            <span>{resultData}</span>
            <SuperInputText placeholder={'Укажите новый пароль'} {...formik.getFieldProps('password')} />
            {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
            <SuperInputText placeholder={'Повторите ввод пароля'} {...formik.getFieldProps('confirmPassword')} />
            {formik.errors.confirmPassword ? <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div> : null}
            <SuperButton children={'Изменить пароль'} type={'submit'} />
         </form>
      </div>
   )
}

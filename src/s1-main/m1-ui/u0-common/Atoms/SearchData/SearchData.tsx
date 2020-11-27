import React from 'react'
import DoubleRange from '../../c9-Range/r1-DoubleRange/DoubleRange'
import s from './SearchData.module.scss'
import { SuperInputText } from '../../c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../c2-SuperButton/SuperButton'
import { FormikProps } from 'formik'
import { SearchFormikValuesType } from './SearchDataContainer'

type SearchDataType = {
   formik: FormikProps<SearchFormikValuesType>
}

const SearchData: React.FC<SearchDataType> = ({ formik }) => {
   return (
      <form onSubmit={formik.handleSubmit}>
         <div className={s['SearchData__container']}>
            <SuperInputText placeholder={'Search'} {...formik.getFieldProps('searchData')} />
            <DoubleRange step={300} startData={0} endData={20000} />
            <SuperButton type='submit'>Search</SuperButton>
         </div>
      </form>
   )
}

export default SearchData

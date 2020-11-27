import React from 'react'
import DoubleRange from '../../c9-Range/r1-DoubleRange/DoubleRange'
import s from './SearchData.module.scss'
import { SuperInputText } from '../../c1-SuperInputText/SuperInputText'
import { SuperButton } from '../../c2-SuperButton/SuperButton'
import { FormikProps } from 'formik'
import { SearchFormikValuesType } from './SearchDataContainer'

type SearchDataType = {
   formik: FormikProps<SearchFormikValuesType>
   rangeData: Array<number>
   rangeDataHandler: (data: Array<number>) => void
}

const SearchData: React.FC<SearchDataType> = ({ formik, rangeData, rangeDataHandler }) => {
   return (
      <form onSubmit={formik.handleSubmit}>
         <div className={s['SearchData__container']}>
            <SuperInputText placeholder={'Search'} {...formik.getFieldProps('searchData')} />
            <DoubleRange
               step={1}
               startData={0}
               endData={5}
               rangeData={rangeData}
               rangeDataHandler={rangeDataHandler}
            />
            <SuperButton type='submit'>Search</SuperButton>
         </div>
      </form>
   )
}

export default SearchData

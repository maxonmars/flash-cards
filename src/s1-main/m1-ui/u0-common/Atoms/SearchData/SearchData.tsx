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
   startData: number
   endData: number
   step: number
}

const SearchData: React.FC<SearchDataType> = ({ formik, rangeData, rangeDataHandler, startData, endData, step }) => {
   return (
      <form onSubmit={formik.handleSubmit}>
         <div className={s['SearchData__container']}>
            <SuperInputText placeholder={'Search'} {...formik.getFieldProps('searchData')} />
            <DoubleRange
               step={step}
               startData={startData}
               endData={endData}
               rangeData={rangeData}
               rangeDataHandler={rangeDataHandler}
            />
            <SuperButton type='submit'>Search</SuperButton>
         </div>
      </form>
   )
}

export default SearchData

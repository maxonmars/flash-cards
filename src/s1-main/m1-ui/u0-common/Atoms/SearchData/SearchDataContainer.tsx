import React from 'react'
import SearchData from './SearchData'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../../m2-bll/store'

export type SearchFormikValuesType = {
   searchData: string
}

const SearchDataContainer = () => {
   const rangeData = useSelector<AppStateType, Array<number>>((state) => state.searchCard.rangeValues)

   const formik = useFormik({
      initialValues: {
         searchData: '',
      },
      onSubmit: (values) => {},
   })

   return <SearchData formik={formik} />
}

export default SearchDataContainer

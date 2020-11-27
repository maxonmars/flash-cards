import React, { useState } from 'react'
import SearchData from './SearchData'
import { useFormik } from 'formik'
import { cardsActions } from '../../../../../s2-features/f7-cards/c2-bll/cardsReducer'
import { useDispatch } from 'react-redux'
export type SearchFormikValuesType = {
   searchData: string
}

const SearchDataContainer = () => {
   const [rangeData, setRangeData] = useState<Array<number>>([1, 5])
   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         searchData: '',
      },
      onSubmit: (values) => {
         dispatch(cardsActions.findcard(values.searchData, rangeData))
      },
   })

   return <SearchData formik={formik} rangeData={rangeData} rangeDataHandler={setRangeData} />
}

export default SearchDataContainer

import React, { useState } from 'react'
import SearchData from './SearchData'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { SuperCheckbox } from '../../c3-SuperCheckbox/SuperCheckbox'
import { AppStateType } from '../../../../m2-bll/store'

export type SearchFormikValuesType = {
   searchData: string
}

type SDCType = {
   startRange: number
   endRange: number
   fetchData: () => void
   searchValue: (data: string) => void
   rangeValue: (minValue: number, maxValue: number) => void
   getMyData?: (data: string) => void
}

const SearchDataContainer: React.FC<SDCType> = ({
   startRange,
   endRange,
   fetchData,
   searchValue,
   rangeValue,
   getMyData,
}) => {
   const [rangeData, setRangeData] = useState<Array<number>>([startRange, endRange])
   const [fetchMyData, setMyFetchData] = useState(false)
   const userID = useSelector<AppStateType, string>((state) => state.login.userID)

   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         searchData: '',
      },
      onSubmit: (values) => {
         dispatch(searchValue(values.searchData))
         dispatch(rangeValue(rangeData[0], rangeData[1]))
         fetchData()
      },
   })

   const myDataHandler = () => {
      setMyFetchData(!fetchMyData)
      if (fetchMyData) {
         getMyData && dispatch(getMyData(''))
         fetchData()
      } else {
         getMyData && dispatch(getMyData(userID))
         fetchData()
      }
   }

   return (
      <>
         <SearchData
            formik={formik}
            rangeData={rangeData}
            rangeDataHandler={setRangeData}
            startData={0}
            endData={10}
            step={1}
         />
         {getMyData && (
            <SuperCheckbox onChangeChecked={myDataHandler} checked={fetchMyData}>
               Показать мои стопки
            </SuperCheckbox>
         )}
      </>
   )
}

export default SearchDataContainer

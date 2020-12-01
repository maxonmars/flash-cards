import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

type SortButtonType = {
   fetchProducts: () => void
   setSortProducts: (data: string) => void
}

const SortButton: React.FC<SortButtonType> = ({ fetchProducts, setSortProducts }) => {
   const [sort, setSort] = useState(-1)
   const dispatch = useDispatch()

   const sortData = (x: number) => {
      setSort(x)
      dispatch(setSortProducts(x + 'name'))
      dispatch(fetchProducts())
   }

   return (
      <div>
         <button style={{ background: sort === 1 ? 'lime' : undefined }} onClick={() => sortData(1)}>
            /\
         </button>
         <button style={{ background: sort === 0 ? 'lime' : undefined }} onClick={() => sortData(0)}>
            \/
         </button>
      </div>
   )
}

export default SortButton

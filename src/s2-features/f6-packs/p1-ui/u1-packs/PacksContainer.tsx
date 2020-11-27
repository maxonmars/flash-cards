import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { usePacks } from './usePacks'
import { Packs } from './Packs'
import { thunks } from '../../p2-bll/packsReducer'
import { ApiPacksType } from '../../p3-dal/packsAPI'

export const PacksContainer = () => {
   const packs = useSelector<AppStateType, Array<ApiPacksType>>((state) => state.packs)
   const { modelPacks } = usePacks()
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(thunks.addPacks())
   }, [dispatch])

   return (
      <>
         <Packs packs={packs} modelPacks={modelPacks} />
      </>
   )
}

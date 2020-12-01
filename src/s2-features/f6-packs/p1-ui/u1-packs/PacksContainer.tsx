import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { usePacks } from './usePacks'
import { Packs } from './Packs'
import { thunks as loginThunk } from '../../../f1-login/l2-bll/loginReducer'
import { actions, InitialPacksStateType, thunks } from '../../p2-bll/packsReducer'
import SearchDataContainer from '../../../../s1-main/m1-ui/u0-common/Atoms/SearchData/SearchDataContainer'
import Pagination from '../../../../s1-main/m1-ui/u0-common/Atoms/Pagination/Pagination'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'

export const PacksContainer = () => {
   const name = useSelector<AppStateType, string>((state) => state.login.name)
   const isLoggedIn = useSelector<AppStateType, string>((state) => state.login.isLoggedIn)
   const {
      packs,
      settings: { page, pageCount, packTotalCount },
   } = useSelector<AppStateType, InitialPacksStateType>((state) => state.packs)
   const { modelPacks } = usePacks()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(thunks.fetchPacks())
      if (!name) dispatch(loginThunk.meTC())
   }, [dispatch, name])

   const getPage = (newPage: number, newPageCount: number) => {
      dispatch(thunks.fetchPacks(newPage, newPageCount))
   }

   if (isLoggedIn === 'notLogged') {
      return <Redirect to={PATH.LOGIN} />
   }
   const handlerDispatch = () => {
      dispatch(thunks.fetchPacks())
   }

   return (
      <>
         <SearchDataContainer
            fetchData={handlerDispatch}
            startRange={1}
            endRange={10}
            searchValue={actions.searchPacks}
            rangeValue={actions.setMinMaxPack}
            getMyData={actions.getMyPack}
         />

         <Packs packs={packs} modelPacks={modelPacks} />
         <Pagination page={page} pageCount={pageCount} pageTotalCount={packTotalCount} getPage={getPage} />
      </>
   )
}

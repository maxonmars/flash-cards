import React, { useEffect } from 'react'
import { Cards } from './Cards'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { useCards } from './useCards'
import { cardsActions, InitialStateType, thunks } from '../../c2-bll/cardsReducer'
import { Redirect, useParams } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import Pagination from '../../../../s1-main/m1-ui/u0-common/Atoms/Pagination/Pagination'
import SearchDataContainer from '../../../../s1-main/m1-ui/u0-common/Atoms/SearchData/SearchDataContainer'
import { GradesPage } from '../../../../s3-devs/grades/g1-ui/GradesPage'

export const CardsContainer = () => {
   const isLoggedIn = useSelector<AppStateType, string>((state) => state.login.isLoggedIn)
   const {
      cards,
      settings: { page, pageCount, cardsTotalCount },
   } = useSelector<AppStateType, InitialStateType>((state) => state.cards)
   const { id } = useParams<{ id: string }>()
   const { modelCards } = useCards(id)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(thunks.fetchCards(id))
   }, [dispatch])

   const getPage = (newPage: number, newPageCount: number) => {
      dispatch(thunks.fetchCards(id, newPage, newPageCount))
   }

   if (isLoggedIn === 'notLogged') {
      return <Redirect to={PATH.LOGIN} />
   }

   const handlerDispatch = () => {
      dispatch(thunks.fetchCards(id))
   }

   return (
      <>
         <SearchDataContainer
            startRange={0}
            endRange={10}
            fetchData={handlerDispatch}
            searchValue={cardsActions.searchCards}
            rangeValue={cardsActions.setMinMaxCards}
         />
         <Cards cards={cards} modelCards={modelCards} />
         <GradesPage />
         <Pagination page={page} pageCount={pageCount} pageTotalCount={cardsTotalCount} getPage={getPage} />
      </>
   )
}

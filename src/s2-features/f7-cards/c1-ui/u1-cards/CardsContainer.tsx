import React, { useEffect } from 'react'
import { Cards } from './Cards'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { useCards } from './useCards'
import { cardsActions, InitialCardsType, thunks } from '../../c2-bll/cardsReducer'
import { Redirect, useParams } from 'react-router-dom'
import { PATH } from '../../../../s1-main/m1-ui/u3-routes/Routes'
import Pagination from '../../../../s1-main/m1-ui/u0-common/Atoms/Pagination/Pagination'
import SearchDataContainer from '../../../../s1-main/m1-ui/u0-common/Atoms/SearchData/SearchDataContainer'
import AddCardModal from './Modals/AddCardModal'
import DeleteCardModal from './Modals/DeleteCardModal'
import UpdateCardModal from './Modals/UpdateCardModel'

export const CardsContainer = () => {
   const isLoggedIn = useSelector<AppStateType, string>((state) => state.login.isLoggedIn)
   const {
      cards,
      settings: { page, pageCount, cardsTotalCount },
      showCardsModal,
      deleteModal: { showDeleteModal },
      updateModal: { showUpdateModal },
   } = useSelector<AppStateType, InitialCardsType>((state) => state.cards)
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
         {showCardsModal && <AddCardModal PackID={id} />}
         {showDeleteModal && <DeleteCardModal PackID={id} />}
         {showUpdateModal && <UpdateCardModal PackID={id} />}
         <SearchDataContainer
            startRange={0}
            endRange={10}
            fetchData={handlerDispatch}
            searchValue={cardsActions.searchCards}
            rangeValue={cardsActions.setMinMaxCards}
         />
         <Cards cards={cards} modelCards={modelCards} />
         <Pagination page={page} pageCount={pageCount} pageTotalCount={cardsTotalCount} getPage={getPage} />
      </>
   )
}

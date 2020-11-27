import React, { useEffect } from 'react'
import { Cards } from './Cards'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { ApiCardsType } from '../../c3-dal/cardsAPI'
import { useCards } from './useCards'
import { thunks } from '../../c2-bll/cardsReducer'
import { useParams } from 'react-router-dom'

export const CardsContainer = () => {
   const cards = useSelector<AppStateType, Array<ApiCardsType>>((state) => state.cards)
   const { modelCards } = useCards()
   const { id } = useParams<{ id: string }>()
   const dispatch = useDispatch()


   useEffect(() => {
      const testPackId = '5eb6a2f72f849402d46c6ac4'
      dispatch(thunks.addCards(testPackId))
   }, [dispatch])

   return (
      <>
         <Cards cards={cards} modelCards={modelCards} />
      </>
   )
}

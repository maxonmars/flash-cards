import React, { useEffect, useState } from 'react'
import { Learn } from './Learn'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { ApiCardsType } from '../../../f7-cards/c3-dal/cardsAPI'
import { useParams } from 'react-router-dom'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'
import { cardActions, thunks } from '../../l2-bll/learnReducer'

export const LearnContainer: React.FC = () => {
   const [isChecked, setChecked] = useState<boolean>(false)
   const cards = useSelector<AppStateType, ApiCardsType[]>((store) => store.cards.cards)
   const card = useSelector<AppStateType, ApiCardsType>((store) => store.learn.card)
   const error = useSelector<AppStateType, string>((store) => store.learn.error)
   const pending = useSelector<AppStateType, boolean>((store) => store.learn.pending)
   const { id } = useParams<{ id: string }>()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(thunks.addCards(id))

      return () => {
         dispatch(cardActions.eraseCards([] as ApiCardsType[]))
         dispatch(cardActions.setError(''))
         dispatch(cardActions.setPending(true))
      }
   }, [dispatch, id])

   const nextQuestion = () => {
      setChecked(false)
      dispatch(cardActions.setCard(cards))
   }

   if (pending) {
      return <Loader />
   }

   return error ? (
      <Error textError={error} />
   ) : (
      <>
         <Learn card={card} setChecked={setChecked} nextQuestion={nextQuestion} isChecked={isChecked} />
      </>
   )
}

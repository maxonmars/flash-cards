import React, { useEffect, useState } from 'react'
import { Learn } from './Learn'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { ApiCardsType, cardsAPI } from '../../../f7-cards/c3-dal/cardsAPI'
import { useParams } from 'react-router-dom'
import { cardsActions } from '../../../f7-cards/c2-bll/cardsReducer'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'

export const LearnContainer: React.FC = () => {
   const [isChecked, setChecked] = useState<boolean>(false)
   const cards = useSelector<AppStateType, ApiCardsType[]>((store) => store.cards)
   const { id } = useParams<{ id: string }>()
   const [pending, setPending] = useState(true)
   const [card, setCard] = useState<ApiCardsType>({} as ApiCardsType)
   const [error, setError] = useState('')

   const dispatch = useDispatch()

   const getData = async () => {
      try {
         const response = await cardsAPI.getCards(id)
         const card: ApiCardsType = getCard(response.cards)
         if (response.cards.length > 0) {
            dispatch(cardsActions.setCards(response.cards))
            setCard(card)
            setPending(false)
         } else {
            setError('This pack has no cards. Please choose another one')
            setPending(false)
         }
      } catch (e) {
         const error = e.response ? e.response.data.error : e.message + ', more details in the console'
         setError(error)
      }
   }

   useEffect(() => {
      getData()
      return () => setCard({} as ApiCardsType)
   }, [])

   const nextQuestion = () => {
      setChecked(false)
      if (cards.length > 0) {
         setCard(getCard(cards))
      }
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

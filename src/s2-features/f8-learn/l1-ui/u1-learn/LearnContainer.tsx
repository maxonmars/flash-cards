import React, { useEffect, useState } from 'react'
import { Learn } from './Learn'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../../s1-main/m2-bll/store'
import { ApiCardsType, cardsAPI } from '../../../f7-cards/c3-dal/cardsAPI'
import { useParams } from 'react-router-dom'
import { cardsActions, thunks } from '../../../f7-cards/c2-bll/cardsReducer'
import { ReactComponent as Loader } from '../../../../s1-main/m1-ui/u0-common/c8-Assets/Spin.svg'
import { Error } from '../../../../s1-main/m1-ui/u0-common/c7-Error/Error'

const getCard = (cards: ApiCardsType[]) => {
   const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
   const rand = Math.random() * sum
   const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
         const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
         return { sum: newSum, id: newSum < rand ? i : acc.id }
      },
      { sum: 0, id: -1 },
   )

   return cards[res.id + 1]
}

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
         dispatch(cardsActions.setCards(response.cards))
         setCard(card)
         setPending(false)
      } catch (e) {
         const error = e.response ? e.response.data.error : e.message + ', more details in the console'
         setError(error)
      }
   }

   useEffect(() => {
      getData()
      if (Object.keys(card).length === 0) {
         setError('Pack are empty. Please select pack with cards')
      }
      return () => setCard({} as ApiCardsType)
   }, [])

   const nextQuestion = () => {
      setChecked(false)
      if (cards.length > 0) {
         setCard(getCard(cards))
      }
   }

   // useEffect(() => {
   //    dispatch(thunks.addCards(id))
   //
   //    if (cards.length > 0) setCard(getCard(cards))
   // }, [])
   //
   // const nextQuestion = () => {
   //    setChecked(false)
   //
   //    if (cards.length > 0) {
   //       setCard(getCard(cards))
   //    }
   // }

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

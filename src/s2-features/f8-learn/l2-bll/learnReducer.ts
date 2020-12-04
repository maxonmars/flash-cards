import { cardsActions } from '../../f7-cards/c2-bll/cardsReducer'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { ApiCardsType, cardsAPI } from '../../f7-cards/c3-dal/cardsAPI'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'

type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof cardActions>

const initialState = {
   card: {} as ApiCardsType,
   error: '',
}

enum CARD {
   SET_CARD = 'SET_CARD',
}

export const cardReducer: Reducer<InitialStateType, ActionTypes> = (state = initialState, action): InitialStateType => {
   switch (action.type) {
      case CARD.SET_CARD:
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
         return {
            ...state,
            card: getCard(action.cards),
         }
      default:
         return state
   }
}

export const cardActions = {
   setCard: (cards: ApiCardsType[]) => ({ type: CARD.SET_CARD as const, cards }),
   setError: (error: string) => ({ type: CARD.SET_ERROR as const, error }),
}

export const thunks = {
   addCards: (id: string): AppThunk => async (dispatch) => {
      try {
         const response = await cardsAPI.getCards(id)
         if (response.cards.length > 0) {
            dispatch(cardActions.setCard(response.cards))
            dispatch(cardsActions.setCards(response.cards))
         }
      } catch (e) {}
   },
}

import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { ApiCardsType, cardsAPI } from '../../f7-cards/c3-dal/cardsAPI'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'

type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof cardActions>

const initialState = {
   cards: [] as ApiCardsType[],
   card: {} as ApiCardsType,
   error: '',
   pending: true,
}

enum CARD {
   SET_CARD = 'SET_CARD',
   SET_CARDS = 'SET_CARDS',
   SET_ERROR = 'SET_ERROR',
   SET_IS_PENDING = 'SET_IS_PENDING',
   ERASE_CARDS = 'ERASE_CARDS',
}

export const learnReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
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
      case CARD.SET_ERROR:
         return {
            ...state,
            error: action.error,
         }
      case CARD.SET_CARDS:
         return {
            ...state,
            cards: action.cards,
         }
      case CARD.ERASE_CARDS:
         return {
            ...state,
            cards: action.eraseArray,
         }
      case CARD.SET_IS_PENDING:
         return {
            ...state,
            pending: action.pending,
         }
      default:
         return state
   }
}

export const cardActions = {
   setCard: (cards: ApiCardsType[]) => ({ type: CARD.SET_CARD as const, cards }),
   setCards: (cards: ApiCardsType[]) => ({ type: CARD.SET_CARDS as const, cards }),
   setError: (error: string) => ({ type: CARD.SET_ERROR as const, error }),
   setPending: (pending: boolean) => ({ type: CARD.SET_IS_PENDING as const, pending }),
   eraseCards: (eraseArray: ApiCardsType[]) => ({ type: CARD.ERASE_CARDS, eraseArray } as const),
}

export const thunks = {
   addCards: (id: string): AppThunk => async (dispatch) => {
      try {
         const response = await cardsAPI.getCards(id)
         if (response.cards.length > 0) {
            dispatch(cardActions.setCards(response.cards))
            dispatch(cardActions.setCard(response.cards))
         } else {
            dispatch(cardActions.setError('This pack has no cards. Please choose another one'))
         }
      } catch (e) {
         const error = e.response ? e.response.data.error : e.message + ', more details in the console'
         dispatch(cardActions.setError(error))
      } finally {
         dispatch(cardActions.setPending(false))
      }
   },
}

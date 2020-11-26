import { ApiCardsType, cardsAPI } from '../c3-dal/cardsAPI'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'

type InitialStateType = ApiCardsType[]

type ActionTypes = InferActionsType<typeof actions>

const initialState: InitialStateType = [
   {
      question: 'zagadka',
      answer: 'otgadka',
      grade: 3,
      updated: '23.05.2007',
      questionImg: 'some img',
   },
]

enum CARDS {
   SET_CARDS = 'SET_CARDS',
}

export const cardsReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case CARDS.SET_CARDS:
         return [...action.cards]
      default:
         return state
   }
}

const actions = {
   setCards: (cards: InitialStateType) => ({ type: CARDS.SET_CARDS, cards }),
}

export const thunks = {
   addCards: (id: string): AppThunk => (dispatch) => {
      cardsAPI.getCards(id).then((res) => dispatch(actions.setCards(res.cards)))
   },
}

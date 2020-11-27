import { ApiCardsType, cardsAPI } from '../c3-dal/cardsAPI'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import range from 'lodash/range';


type InitialStateType = ApiCardsType[]

type ActionTypes = InferActionsType<typeof cardsActions>

const initialState: InitialStateType = [
   {
      question: 'zagadka',
      answer: 'otgadka',
      grade: 3,
      updated: '23.05.2007',
      questionImg: 'some img',
   },
   {
      question: 'zagadka',
      answer: 'otgadka',
      grade: 0,
      updated: '23.05.2007',
      questionImg: 'some img',
   },
   {
      question: 'chokoladka',
      answer: 'otchokoladka',
      grade: 2,
      updated: '23.05.2007',
      questionImg: 'some img',
   },
   {
      question: 'sataka',
      answer: 'otsataka',
      grade: 1,
      updated: '23.05.2007',
      questionImg: 'some img',
   },
   {
      question: 'katka',
      answer: 'otkatka',
      grade: 4,
      updated: '23.05.2007',
      questionImg: 'some img',
   },
]

enum CARDS {
   SET_CARDS = 'SET_CARDS',
   FIND_CARD = 'FIND_CARD'
}

export const cardsReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case CARDS.SET_CARDS:
         return [...state, ...action.cards]
      case CARDS.FIND_CARD:
         return state.filter((col) => {
            const rangeData: Array<number | undefined> = range(action.range[0], action.range[1]-1)
            if (col.question.includes(action.name) && rangeData.includes(col.grade) ){
               return {...col}
            }
         })
      default:
         return state
   }
}

export const cardsActions = {
   setCards: (cards: InitialStateType) => ({ type: CARDS.SET_CARDS, cards } as const),
   findcard: (name: string, range: Array<number>) => ({ type: CARDS.FIND_CARD, name, range } as const),
}

export const thunks = {
   addCards: (id: string): AppThunk => (dispatch) => {
      cardsAPI.getCards(id).then((res) => dispatch(cardsActions.setCards(res.cards)))
   },
}

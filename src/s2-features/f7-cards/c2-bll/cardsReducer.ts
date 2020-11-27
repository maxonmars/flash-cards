import { ApiCardsType, cardsAPI, CreateCardType, UpdateCardType } from '../c3-dal/cardsAPI'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'

type InitialStateType = ApiCardsType[]

type ActionTypes = InferActionsType<typeof actions>

const initialState: InitialStateType = []

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
   createCard: (data: CreateCardType, pack_id: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.createCard(data)
         dispatch(thunks.addCards(pack_id))
      } catch (e) {}
   },
   deleteCard: (id: string, pack_id: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.deleteCard(id)
         dispatch(thunks.addCards(pack_id))
      } catch (e) {}
   },
   updateCard: (data: UpdateCardType, pack_id: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.updateCard(data)
         dispatch(thunks.addCards(pack_id))
      } catch (e) {}
   },
}

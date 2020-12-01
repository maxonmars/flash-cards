import { ApiCardsType, cardsAPI, CreateCardType, UpdateCardType } from '../c3-dal/cardsAPI'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import range from 'lodash/range'
import { AppStateType } from '../../../s1-main/m2-bll/store'

type ActionTypes = InferActionsType<typeof cardsActions>

type InitialCardsSettingsStateType = {
   page: number
   pageCount: number
   cardsTotalCount: number
   min: number
   max: number
   sortCards: string
   cardQuestion: string
   packUserId: string
}

export type InitialStateType = {
   cards: ApiCardsType[]
   settings: InitialCardsSettingsStateType
}

const initialState: InitialStateType = {
   cards: [],
   settings: {
      page: 1,
      pageCount: 4,
      cardsTotalCount: 40,
      min: 1,
      max: 5,
      sortCards: '',
      cardQuestion: '',
      packUserId: '',
   },
}

enum CARDS {
   SET_CARDS = 'SET_CARDS',
   SEARCH_CARDS = 'SEARCH_PACKS',
   SET_MIN_MAX_CARDS = 'SET_MIN_MAX',
   SORT_CARDS = 'SORT_PRODUCT',
   // GET_MY_CARDS = 'GET_MY_PACK',
}

export const cardsReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case CARDS.SET_CARDS:
         return {
            ...state,
            cards: action.cards,
            settings: action.settings,
         }
      case CARDS.SEARCH_CARDS:
         return {
            ...state,
            settings: {
               ...state.settings,
               cardQuestion: action.cardQuestion,
            },
         }
      case CARDS.SET_MIN_MAX_CARDS:
         return {
            ...state,
            settings: {
               ...state.settings,
               min: action.min,
               max: action.max,
            },
         }
      case CARDS.SORT_CARDS:
         return {
            ...state,
            settings: {
               ...state.settings,
               sortCards: action.sortedPack,
            },
         }
      default:
         return state
   }
}

export const cardsActions = {
   fetchCards: (cards: ApiCardsType[], settings: InitialCardsSettingsStateType) =>
      ({ type: CARDS.SET_CARDS, cards, settings } as const),
   searchCards: (cardQuestion: string) =>
      ({
         type: CARDS.SEARCH_CARDS,
         cardQuestion,
      } as const),
   setMinMaxCards: (min: number, max: number) => ({ type: CARDS.SET_MIN_MAX_CARDS, min, max } as const),
   sortCards: (sortedPack: string) => ({ type: CARDS.SORT_CARDS, sortedPack } as const),
}

type CardsStoreType = () => AppStateType

export const thunks = {
   fetchCards: (packUId?: string, newPage?: number, newPageCount?: number): AppThunk => async (
      dispatch,
      getStore: CardsStoreType,
   ) => {
      const { pageCount, page, cardQuestion, sortCards, min, max, packUserId } = getStore().cards.settings
      try {
         const data = await cardsAPI.getCards(
            packUId || packUserId,
            min,
            max,
            newPage || page,
            newPageCount || pageCount,
            cardQuestion,
            sortCards,
         )
         dispatch(
            cardsActions.fetchCards(data.cards, {
               page: data.page,
               pageCount: data.pageCount,
               cardQuestion,
               sortCards,
               min: data.minGrade,
               max: data.minGrade,
               packUserId,
               cardsTotalCount: data.cardsTotalCount,
            }),
         )
      } catch (e) {}
   },
   createCard: (data: CreateCardType, packUId: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.createCard(data)
         dispatch(thunks.fetchCards(packUId))
      } catch (e) {}
   },
   deleteCard: (id: string, packUId: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.deleteCard(id)
         dispatch(thunks.fetchCards(packUId))
      } catch (e) {}
   },
   updateCard: (data: UpdateCardType, packUId: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.updateCard(data)
         dispatch(thunks.fetchCards(packUId))
      } catch (e) {}
   },
}

import { ApiCardsType, cardsAPI, CreateCardType, UpdateCardType } from '../c3-dal/cardsAPI'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { AppStateType } from '../../../s1-main/m2-bll/store'
import { actions } from '../../f6-packs/p2-bll/packsReducer'

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

export type InitialCardsType = {
   cards: ApiCardsType[]
   settings: InitialCardsSettingsStateType
   showCardsModal: boolean
   deleteModal: {
      showDeleteModal: boolean
      cardID: string
   }
   updateModal: {
      showUpdateModal: boolean
      question: string
      comments: string
      _id: string
   }
}

const initialState: InitialCardsType = {
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
   showCardsModal: false,
   deleteModal: {
      showDeleteModal: false,
      cardID: '',
   },
   updateModal: {
      showUpdateModal: false,
      question: '',
      comments: '',
      _id: '',
   },
}

enum CARDS {
   SET_CARDS = 'SET_CARDS',
   SEARCH_CARDS = 'SEARCH_PACKS',
   SET_MIN_MAX_CARDS = 'SET_MIN_MAX',
   SORT_CARDS = 'SORT_PRODUCT',
   SHOW_CARDS_MODAL = 'SHOW_CARDS_MODAL',
   SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL',
   SHOW_UPDATE_MODAL = 'SHOW_UPDATE_MODAL',
   GET_USER_ID = 'GET_USER_ID',
}

export const cardsReducer: Reducer<InitialCardsType, ActionTypes> = (
   state = initialState,
   action,
): InitialCardsType => {
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
      case CARDS.SHOW_CARDS_MODAL:
         return {
            ...state,
            showCardsModal: action.modal,
         }
      case CARDS.SHOW_DELETE_MODAL:
         return {
            ...state,
            deleteModal: {
               showDeleteModal: action.modal,
               cardID: action.cardID,
            },
         }
      case CARDS.SHOW_UPDATE_MODAL:
         return {
            ...state,
            updateModal: {
               ...state.updateModal,
               question: state.cards.find((e) => e._id === action.cardID)?.question || '',
               showUpdateModal: action.modal,
               _id: action.cardID,
            },
         }
      case CARDS.GET_USER_ID:
         return {
            ...state,
            settings: {
               ...state.settings,
               packUserId: action.UserID,
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
   showCardsModal: (modal: boolean) => ({ type: CARDS.SHOW_CARDS_MODAL, modal } as const),
   showDeleteModal: (modal: boolean, cardID: string) => ({ type: CARDS.SHOW_DELETE_MODAL, modal, cardID } as const),
   showUpdateModal: (modal: boolean, cardID: string) => ({ type: CARDS.SHOW_UPDATE_MODAL, modal, cardID } as const),
   getUserID: (UserID: string) => ({ type: CARDS.GET_USER_ID, UserID } as const),
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
   createCard: (answer: string, question: string, packUId: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.createCard({
            answer,
            question,
            answerImg: '',
            answerVideo: '',
            cardsPack_id: packUId,
            grade: 0,
            rating: 0,
            shots: 0,
            type: '',
            questionImg: '',
            questionVideo: '',
         })
         dispatch(cardsActions.showCardsModal(false))
         dispatch(thunks.fetchCards(packUId))
      } catch (e) {}
   },
   deleteCard: (id: string, packUId: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.deleteCard(id)
         dispatch(cardsActions.showDeleteModal(false, ''))
         dispatch(thunks.fetchCards(packUId))
      } catch (e) {}
   },
   updateCard: (data: UpdateCardType, packUId: string): AppThunk => async (dispatch) => {
      try {
         await cardsAPI.updateCard(data)
         dispatch(cardsActions.showUpdateModal(false, ''))
         dispatch(thunks.fetchCards(packUId))
      } catch (e) {}
   },
}

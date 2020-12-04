import { Reducer } from 'redux'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { ApiPacksType, packsAPI, UpdatePackType } from '../p3-dal/packsAPI'
import { AppStateType } from '../../../s1-main/m2-bll/store'

type InitialPackSettingsStateType = {
   page: number
   pageCount: number
   min: number
   max: number
   sortPack: string
   packTotalCount: number
   searchName: string
   userID: string
}

export type InitialPacksStateType = {
   packs: ApiPacksType[]
   settings: InitialPackSettingsStateType
   showAddModal: boolean
   deleteModal: {
      showDeleteModal: boolean
      packID: string
   }
}

const initialState: InitialPacksStateType = {
   packs: [],
   settings: {
      page: 1,
      pageCount: 4,
      packTotalCount: 0,
      min: 0,
      max: 5,
      sortPack: '',
      searchName: '',
      userID: '',
   },
   showAddModal: false,
   deleteModal: {
      showDeleteModal: false,
      packID: '',
   },
}

type ActionTypes = InferActionsType<typeof actions>

enum PACKS {
   FETCH_PACKS = 'FETCH_PACKS',
   SEARCH_PACKS = 'SEARCH_PACKS',
   SET_MIN_MAX_PACKS = 'SET_MIN_MAX',
   SORT_PACK = 'SORT_PRODUCT',
   GET_MY_PACK = 'GET_MY_PACK',
   SHOW_ADD_MODAL = 'SHOW_ADD_MODAL',
   SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL',
}

export const packsReducer: Reducer<InitialPacksStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialPacksStateType => {
   switch (action.type) {
      case PACKS.FETCH_PACKS:
         return {
            ...state,
            packs: action.packs,
            settings: action.settings,
         }
      case PACKS.SEARCH_PACKS:
         return {
            ...state,
            settings: {
               ...state.settings,
               searchName: action.searchName,
            },
         }
      case PACKS.SET_MIN_MAX_PACKS:
         return {
            ...state,
            settings: {
               ...state.settings,
               min: action.min,
               max: action.max,
            },
         }
      case PACKS.SORT_PACK:
         return {
            ...state,
            settings: {
               ...state.settings,
               sortPack: action.sortedPack,
            },
         }
      case PACKS.GET_MY_PACK:
         return {
            ...state,
            settings: {
               ...state.settings,
               userID: action.userID,
            },
         }
      case PACKS.SHOW_ADD_MODAL:
         return {
            ...state,
            showAddModal: action.modal,
         }
      case PACKS.SHOW_DELETE_MODAL:
         return {
            ...state,
            deleteModal: {
               ...state.deleteModal,
               showDeleteModal: action.modal,
               packID: action.packID,
            },
         }
      default:
         return state
   }
}

export const actions = {
   setPacks: (packs: ApiPacksType[], settings: InitialPackSettingsStateType) =>
      ({
         type: PACKS.FETCH_PACKS,
         packs,
         settings,
      } as const),
   searchPacks: (searchName: string) =>
      ({
         type: PACKS.SEARCH_PACKS,
         searchName,
      } as const),
   setMinMaxPack: (min: number, max: number) =>
      ({
         type: PACKS.SET_MIN_MAX_PACKS,
         min,
         max,
      } as const),
   sortPacks: (sortedPack: string) =>
      ({
         type: PACKS.SORT_PACK,
         sortedPack,
      } as const),
   getMyPack: (userID: string) =>
      ({
         type: PACKS.GET_MY_PACK,
         userID,
      } as const),
   showAddModal: (modal: boolean) =>
      ({
         type: PACKS.SHOW_ADD_MODAL,
         modal,
      } as const),
   showDeleteModal: (modal: boolean, packID: string) =>
      ({
         type: PACKS.SHOW_DELETE_MODAL,
         modal,
         packID,
      } as const),
}

type PackStoreType = () => AppStateType

export const thunks = {
   fetchPacks: (newPage?: number, newPageCount?: number): AppThunk => async (dispatch, getStore: PackStoreType) => {
      const { searchName, page, pageCount, min, max, sortPack, userID } = getStore().packs.settings
      try {
         const data = await packsAPI.getPacks(
            searchName,
            min,
            max,
            newPage || page,
            newPageCount || pageCount,
            sortPack,
            userID,
         )
         dispatch(
            actions.setPacks(data.cardPacks, {
               page: data.page,
               pageCount: data.pageCount,
               searchName,
               sortPack,
               userID,
               min: data.minCardsCount,
               max: data.maxCardsCount,
               packTotalCount: data.cardPacksTotalCount,
            }),
         )
      } catch (e) {}
   },
   createPack: (packName: string): AppThunk => async (dispatch) => {
      try {
         await packsAPI.createPack({
            name: packName,
            private: false,
            path: '',
            type: '',
            deckCover: '',
            grade: 0,
            rating: 0,
            shots: 0,
         })
         dispatch(actions.showAddModal(false))
         dispatch(thunks.fetchPacks())
      } catch (e) {}
   },
   deletePack: (pack_id: string): AppThunk => async (dispatch) => {
      try {
         await packsAPI.deletePack(pack_id)
         dispatch(actions.showDeleteModal(false, ''))
         dispatch(thunks.fetchPacks())
      } catch (e) {}
   },
   updatePack: (data: UpdatePackType): AppThunk => async (dispatch) => {
      try {
         await packsAPI.updatePack(data)
         dispatch(thunks.fetchPacks())
      } catch (e) {}
   },
}

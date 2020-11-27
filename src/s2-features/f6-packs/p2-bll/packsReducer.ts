import { Reducer } from 'redux'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { ApiPacksType, packsAPI, UpdatePackType } from '../p3-dal/packsAPI'

export type InitialStateType = ApiPacksType[]
const initialState: InitialStateType = []

type ActionTypes = InferActionsType<typeof actions>

enum PACKS {
   ADD_PACKS = 'ADD_PACKS',
}

export const packsReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case PACKS.ADD_PACKS:
         return [...action.packs]
      default:
         return state
   }
}

export const actions = {
   setPacks: (packs: InitialStateType) => ({ type: PACKS.ADD_PACKS, packs }),
}

export const thunks = {
   addPacks: (): AppThunk => (dispatch) => {
      packsAPI.getPacks().then((res) => dispatch(actions.setPacks(res.cardPacks)))
   },
   createPack: (): AppThunk => async (dispatch) => {
      try {
         await packsAPI.createPack({
            name: 'Galera pack',
            private: false,
            path: '',
            type: '',
            deckCover: '',
            grade: 0,
            rating: 0,
            shots: 0,
         })
         dispatch(thunks.addPacks())
      } catch (e) {}
   },
   deletePack: (pack_id: string): AppThunk => async (dispatch) => {
      try {
         await packsAPI.deletePack(pack_id)
         dispatch(thunks.addPacks())
      } catch (e) {}
   },
   updatePack: (data: UpdatePackType): AppThunk => async (dispatch) => {
      try {
         await packsAPI.updatePack(data)
         dispatch(thunks.addPacks())
      } catch (e) {}
   },
}

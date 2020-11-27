import { Reducer } from 'redux'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { ApiPacksType, packsAPI } from '../p3-dal/packsAPI'

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
}

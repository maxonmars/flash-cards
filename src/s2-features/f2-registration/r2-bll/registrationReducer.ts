import { Reducer } from 'redux'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { registrationAPI } from '../r3-dal/registrationAPI'

export type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof actions>

const initialState = {
   isSuccessRegister: false,
   error: '',
}

export const registrationReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case 'IS_REGISTER':
         return { ...state, isSuccessRegister: action.isSuccessRegister }
      case 'SET_ERROR':
         return { ...state, error: action.message }
      default:
         return state
   }
}

export const actions = {
   toggleSuccessRegister: (isSuccessRegister: boolean) => ({ type: 'IS_REGISTER', isSuccessRegister } as const),
   setError: (message: string) => ({ type: 'SET_ERROR', message } as const),
}

export const thunks = {
   accountCreation: (email: string, password: string): AppThunk => async (dispatch) => {
      try {
         await registrationAPI.setRegister(email, password)
         dispatch(actions.toggleSuccessRegister(true))
      } catch (e) {
         dispatch(actions.setError(e.response.data.error))
      }
   },
}

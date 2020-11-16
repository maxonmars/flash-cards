import { Reducer } from 'redux'
import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { registrationAPI } from '../r3-dal/registrationAPI'

export type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof actions>

const initialState = {
   isRegistration: false,
   error: '',
}

export const registrationReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case 'IS_REGISTER':
         return { ...state, isRegistration: action.isRegistration }
      case 'SET_ERROR':
         return { ...state, error: action.message }
      default:
         return state
   }
}

const actions = {
   isRegister: (isRegistration: boolean) => ({ type: 'IS_REGISTER', isRegistration } as const),
   setError: (message: string) => ({ type: 'SET_ERROR', message } as const),
}

export const thunks = {
   accountCreation: (email: string, password: string): AppThunk => async (dispatch) => {
      try {
         const result = await registrationAPI.setRegister(email, password)
         if (result.addedUser) {
            dispatch(actions.isRegister(true))
         }
      } catch (e) {
         dispatch(actions.setError(e.response.data.error))
      }
   },
}

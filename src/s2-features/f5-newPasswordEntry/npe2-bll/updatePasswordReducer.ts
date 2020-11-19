import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { updatePassAPI } from '../npe3-dal/updatePassAPI'

export type InitialStateRecoveryType = typeof initialState

enum CONS {
   UPDATE_RESULT = 'UPDATE_RESULT',
   SET_PASS = 'SET_PASS',
   UPDATED_PASS = 'UPDATED_PASS',
}

type ActionTypes = InferActionsType<typeof actionsUpdate>

const initialState = {
   result: 'Укажите новый пароль',
   password: '',
   passIsUpdated: false,
}

export const updatePasswordReducer: Reducer<InitialStateRecoveryType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateRecoveryType => {
   switch (action.type) {
      case CONS.UPDATE_RESULT:
         return { ...state, result: action.result }
      case CONS.SET_PASS:
         return { ...state, password: action.password }
      case CONS.UPDATED_PASS:
         return { ...state, passIsUpdated: action.status }
      default:
         return state
   }
}

export const actionsUpdate = {
   passUpdateResultAC: (result: string) =>
      ({
         type: CONS.UPDATE_RESULT,
         result,
      } as const),
   setPassAC: (password: string) =>
      ({
         type: CONS.SET_PASS,
         password,
      } as const),
   passUpdatedAC: (status: boolean) =>
      ({
         type: CONS.UPDATED_PASS,
         status,
      } as const),
}

export const updatePasswordTC = {
   updatePass: (email: string, token: string): AppThunk => async (dispatch) => {
      try {
         const res = await updatePassAPI.updatePass(email, token)
         dispatch(actionsUpdate.passUpdateResultAC(res.data.info))
         dispatch(actionsUpdate.passUpdatedAC(true))
      } catch (e) {
         console.log(e)
         dispatch(actionsUpdate.passUpdateResultAC(e.data.error))
      }
   },
}

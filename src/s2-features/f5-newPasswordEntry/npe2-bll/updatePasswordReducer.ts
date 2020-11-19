import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { updatePassAPI } from '../npe3-dal/updatePassAPI'

export type InitialStateRecoveryType = typeof initialState

enum UPDATE_PASSWORD {
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
      case UPDATE_PASSWORD.UPDATE_RESULT:
         return { ...state, result: action.result }
      case UPDATE_PASSWORD.SET_PASS:
         return { ...state, password: action.password }
      case UPDATE_PASSWORD.UPDATED_PASS:
         return { ...state, passIsUpdated: action.status }
      default:
         return state
   }
}

export const actionsUpdate = {
   passUpdateResultAC: (result: string) =>
      ({
         type: UPDATE_PASSWORD.UPDATE_RESULT,
         result,
      } as const),
   setPassAC: (password: string) =>
      ({
         type: UPDATE_PASSWORD.SET_PASS,
         password,
      } as const),
   passUpdatedAC: (status: boolean) =>
      ({
         type: UPDATE_PASSWORD.UPDATED_PASS,
         status,
      } as const),
}

export const updatePasswordTC = {
   updatePass: (password: string, resetPasswordToken: string): AppThunk => async (dispatch) => {
      try {
         const res = await updatePassAPI.updatePass(password, resetPasswordToken)
         dispatch(actionsUpdate.passUpdateResultAC(res.info))
         dispatch(actionsUpdate.passUpdatedAC(true))
      } catch (e) {
         dispatch(actionsUpdate.passUpdateResultAC(e.data.error))
      }
   },
}

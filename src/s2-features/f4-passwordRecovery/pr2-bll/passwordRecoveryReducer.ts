import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { passRecoveryAPI } from '../pr3-dal/passwordRecoveryAPI'

export type InitialStateRecoveryType = typeof initialState

enum CONS {
   CHANGE_PASS = 'CHANGE_PASS',
   SEND_EMAIL = 'SEND_EMAIL',
}

type ActionTypes = InferActionsType<typeof actions>

const initialState = {
   inputText: '',
   result: 'Укажите вашу электронную почту для востановления пароля',
}

export const passwordRecoveryReducer: Reducer<InitialStateRecoveryType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateRecoveryType => {
   switch (action.type) {
      case CONS.CHANGE_PASS:
         return { ...state, inputText: action.text }
      case CONS.SEND_EMAIL:
         return { ...state, result: action.result, inputText: '' }
      default:
         return state
   }
}

export const actions = {
   recoverPassAC: (text: string) =>
      ({
         type: CONS.CHANGE_PASS,
         text,
      } as const),
   sendEmailAC: (result: string) =>
      ({
         type: CONS.SEND_EMAIL,
         result,
      } as const),
}

export const recoverThunks = {
   sendEmailTC: (email: string): AppThunk => async (dispatch) => {
      try {
         const res = await passRecoveryAPI.recovery(email)
         dispatch(actions.sendEmailAC(res.data.info))
      } catch (e) {
         dispatch(actions.sendEmailAC(e.response.data.error))
      }
   },
}

import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { passRecoveryAPI } from '../pr3-dal/passwordRecoveryAPI'
import { actionsUpdate } from '../../f5-newPasswordEntry/npe2-bll/updatePasswordReducer'

export type InitialStateRecoveryType = typeof initialState

enum PASSWORD_RECOVERY {
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
      case PASSWORD_RECOVERY.CHANGE_PASS:
         return { ...state, inputText: action.text }
      case PASSWORD_RECOVERY.SEND_EMAIL:
         return { ...state, result: action.result, inputText: '' }
      default:
         return state
   }
}

export const actions = {
   recoverPassAC: (text: string) =>
      ({
         type: PASSWORD_RECOVERY.CHANGE_PASS,
         text,
      } as const),
   sendEmailAC: (result: string) =>
      ({
         type: PASSWORD_RECOVERY.SEND_EMAIL,
         result,
      } as const),
}

export const recoverThunks = {
   sendEmailTC: (email: string): AppThunk => async (dispatch) => {
      try {
         const res = await passRecoveryAPI.recovery(email)
         dispatch(actions.sendEmailAC(res.info))
         dispatch(actionsUpdate.passUpdatedAC(true))
      } catch (e) {
         dispatch(actions.sendEmailAC(e.response.data.error))
      }
   },
}

import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'

export type InitialStateSearchCardType = typeof initialState

enum SEARCH_CARD {
   SET_RANGE_VALUE = 'SET_RANGE_VALUE',
}

type ActionTypes = InferActionsType<typeof actionsSearchCard>

const initialState = {
   rangeValues: [400, 600],
}

export const searchCardReducer: Reducer<InitialStateSearchCardType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateSearchCardType => {
   switch (action.type) {
      case SEARCH_CARD.SET_RANGE_VALUE:
         return { ...state, rangeValues: action.value }

      default:
         return state
   }
}

export const actionsSearchCard = {
   setRangeValueAC: (value: Array<number>) =>
      ({
         type: SEARCH_CARD.SET_RANGE_VALUE,
         value,
      } as const),
}

// export const updatePasswordTC = {
//    updatePass: (password: string, resetPasswordToken: string): AppThunk => async (dispatch) => {
//       try {
//          const res = await updatePassAPI.updatePass(password, resetPasswordToken)
//          dispatch(actionsUpdate.passUpdateResultAC(res.info))
//          dispatch(actionsUpdate.passUpdatedAC(true))
//       } catch (e) {
//          dispatch(actionsUpdate.passUpdateResultAC(e.data.error))
//       }
//    },
// }

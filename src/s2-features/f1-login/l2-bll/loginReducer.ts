import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Dispatch, Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { FormikValuesType } from '../l1-ui/u1-login/LoginContainer'
import { loginAPI } from '../l3-dal/loginAPI'

type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof actions>

enum LOGIN {
   SET_USER = 'SET_USER',
   IS_LOGGED_IN = 'IS_LOGGED_IN',
   SET_ERROR = 'SET_ERROR',
}

const initialState = {
   name: '',
   email: '',
   isLoggedIn: false,
   error: '',
}

export const loginReducer: Reducer<InitialStateType, ActionTypes> = (
   state = initialState,
   action,
): InitialStateType => {
   switch (action.type) {
      case LOGIN.SET_USER:
         return {
            ...state,
            name: action.name,
            email: action.email,
         }
      case LOGIN.IS_LOGGED_IN:
         return {
            ...state,
            isLoggedIn: action.isLoggedIn,
         }
      case LOGIN.SET_ERROR:
         return {
            ...state,
            error: action.error,
         }
      default:
         return state
   }
}

export const actions = {
   setUserAC: (name: string, email: string) => ({ type: LOGIN.SET_USER as const, email, name }),
   isLoggedInAC: (isLoggedIn: boolean) => ({ type: LOGIN.IS_LOGGED_IN as const, isLoggedIn }),
   setErrorAC: (error: string) => ({ type: LOGIN.SET_ERROR as const, error }),
}

const errorHandler = (e: any, dispatch: Dispatch) => {
   const error = e.response ? e.response.data.error : e.message + ', more details in the console'
   dispatch(actions.setErrorAC(error))
}

export const thunks = {
   loginTC: (values: FormikValuesType): AppThunk => async (dispatch) => {
      try {
         const response = await loginAPI.login(values)
         dispatch(actions.setUserAC(response.name, response.email))
         dispatch(actions.isLoggedInAC(true))
      } catch (e) {
         errorHandler(e, dispatch)
      }
   },
   logoutTC: (): AppThunk => async (dispatch) => {
      try {
         await loginAPI.logout()
         dispatch(actions.isLoggedInAC(false))
         dispatch(actions.setUserAC('', ''))
      } catch (e) {
         errorHandler(e, dispatch)
      }
   },
   meTC: (): AppThunk => async (dispatch) => {
      try {
         const response = await loginAPI.me()
         dispatch(actions.isLoggedInAC(true))
         dispatch(actions.setUserAC(response.name, response.email))
      } catch (e) {
         dispatch(actions.isLoggedInAC(false))
         errorHandler(e, dispatch)
      }
   },
}

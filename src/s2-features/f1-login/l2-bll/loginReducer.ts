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
   SET_PENDING = 'SET_PENDING',
   SET_USER_ID = 'SET_USER_ID',
}

const initialState = {
   name: '',
   email: '',
   userID: '',
   isLoggedIn: '',
   error: '',
   pending: false,
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
      case LOGIN.SET_PENDING:
         return {
            ...state,
            pending: action.pending,
         }
      case LOGIN.SET_USER_ID:
         return {
            ...state,
            userID: action.userID,
         }
      default:
         return state
   }
}

export const actions = {
   setUserAC: (name: string, email: string) => ({ type: LOGIN.SET_USER as const, email, name }),
   isLoggedInAC: (isLoggedIn: string) => ({ type: LOGIN.IS_LOGGED_IN as const, isLoggedIn }),
   setErrorAC: (error: string) => ({ type: LOGIN.SET_ERROR as const, error }),
   setPendingAC: (pending: boolean) => ({ type: LOGIN.SET_PENDING as const, pending }),
   setUserID: (userID: string) => ({ type: LOGIN.SET_USER_ID as const, userID }),
}

const errorHandler = (e: any, dispatch: Dispatch) => {
   const error = e.response ? e.response.data.error : e.message + ', more details in the console'
   dispatch(actions.setErrorAC(error))
}

export const thunks = {
   loginTC: (values: FormikValuesType): AppThunk => async (dispatch) => {
      try {
         const response = await loginAPI.login(values)
         dispatch(actions.isLoggedInAC('logged'))
         dispatch(actions.setUserAC(response.name, response.email))
         dispatch(actions.setUserID(response._id))
      } catch (e) {
         errorHandler(e, dispatch)
      }
   },
   logoutTC: (): AppThunk => async (dispatch) => {
      try {
         await loginAPI.logout()
         dispatch(actions.isLoggedInAC('notLogged'))
         dispatch(actions.setUserAC('', ''))
      } catch (e) {
         errorHandler(e, dispatch)
      }
   },
   meTC: (): AppThunk => async (dispatch) => {
      try {
         dispatch(actions.setPendingAC(true))
         const response = await loginAPI.me()
         dispatch(actions.isLoggedInAC('logged'))
         dispatch(actions.setUserAC(response.name, response.email))
         dispatch(actions.setPendingAC(false))
         dispatch(actions.setUserID(response._id))
      } catch (e) {
         dispatch(actions.isLoggedInAC('notLogged'))
         dispatch(actions.setPendingAC(false))
         errorHandler(e, dispatch)
      }
   },
}

import { InferActionsType } from '../../../s1-main/m2-bll/actions'
import { Reducer } from 'redux'
import { AppThunk } from '../../../s1-main/m3-dal/thunks'
import { FormikValuesType } from '../l1-ui/u1-login/LoginContainer'
import { loginAPI } from '../l3-dal/loginAPI'
import { AppStateType } from '../../../s1-main/m2-bll/store'

type InitialStateType = typeof initialState

type ActionTypes = InferActionsType<typeof actions>

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
      case 'login/SET-USER':
         return {
            ...state,
            name: action.name,
            email: action.email,
         }
      case 'login/IS-LOGGED-IN':
         return {
            ...state,
            isLoggedIn: action.isLoggedIn,
         }
      case 'login/SET_ERROR':
         return {
            ...state,
            error: action.error,
         }
      default:
         return state
   }
}

export const actions = {
   setUserAC: (name: string, email: string) => ({ type: 'login/SET-USER' as const, email, name }),
   isLoggedInAC: (isLoggedIn: boolean) => ({ type: 'login/IS-LOGGED-IN' as const, isLoggedIn }),
   setErrorAC: (error: string) => ({ type: 'login/SET_ERROR' as const, error }),
}

export const thunks = {
   loginTC: (values: FormikValuesType): AppThunk => (dispatch) => {
      loginAPI
         .login(values)
         .then((res) => {
            dispatch(actions.setUserAC(res.name, res.email))
            dispatch(actions.isLoggedInAC(true))
         })
         .catch((e) => {
            const error = e.response ? e.response.data.error : e.message + ', more details in the console'
            dispatch(actions.setErrorAC(error))
         })
   },
   logoutTC: (): AppThunk => (dispatch) => {
      loginAPI
         .logout()
         .then(() => {
            dispatch(actions.isLoggedInAC(false))
         })
         .catch((e) => {
            const error = e.response ? e.response.data.error : e.message + ', more details in the console'
            dispatch(actions.setErrorAC(error))
         })
   },
   meTC: (): AppThunk => (dispatch, getState: () => AppStateType) => {
      loginAPI.me().then((res) => {
         const email = getState().login.email
         if (res.data.email === email) {
            dispatch(actions.isLoggedInAC(true))
         } else {
            dispatch(actions.isLoggedInAC(false))
         }
      })
   },
}

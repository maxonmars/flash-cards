import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { loginReducer } from '../../s2-features/f1-login/l2-bll/loginReducer'
import { profileReducer } from '../../s2-features/f3-profile/p2-bll/profileReducer'
import { passwordRecoveryReducer } from '../../s2-features/f4-passwordRecovery/pr2-bll/passwordRecoveryReducer'

const reducers = combineReducers({
   login: loginReducer,
   profile: profileReducer,
   passRecovery: passwordRecoveryReducer,
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store

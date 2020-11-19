import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { loginReducer } from '../../s2-features/f1-login/l2-bll/loginReducer'
import { profileReducer } from '../../s2-features/f3-profile/p2-bll/profileReducer'
import { passwordRecoveryReducer } from '../../s2-features/f4-passwordRecovery/pr2-bll/passwordRecoveryReducer'
import { registrationReducer } from '../../s2-features/f2-registration/r2-bll/registrationReducer'
import { updatePasswordReducer } from '../../s2-features/f5-newPasswordEntry/npe2-bll/updatePasswordReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
   login: loginReducer,
   profile: profileReducer,
   registration: registrationReducer,
   passRecovery: passwordRecoveryReducer,
   updatePass: updatePasswordReducer,
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store

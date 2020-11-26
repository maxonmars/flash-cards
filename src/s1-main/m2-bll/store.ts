import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { loginReducer } from '../../s2-features/f1-login/l2-bll/loginReducer'
import { profileReducer } from '../../s2-features/f3-profile/p2-bll/profileReducer'
import { passwordRecoveryReducer } from '../../s2-features/f4-passwordRecovery/pr2-bll/passwordRecoveryReducer'
import { registrationReducer } from '../../s2-features/f2-registration/r2-bll/registrationReducer'
import { updatePasswordReducer } from '../../s2-features/f5-newPasswordEntry/npe2-bll/updatePasswordReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { packsReducer } from '../../s2-features/f6-packs/p2-bll/packsReducer'
import { cardsReducer } from '../../s2-features/f7-cards/c2-bll/cardsReducer'

const reducers = combineReducers({
   login: loginReducer,
   profile: profileReducer,
   registration: registrationReducer,
   passRecovery: passwordRecoveryReducer,
   updatePass: updatePasswordReducer,
   packs: packsReducer,
   cards: cardsReducer,
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export type AppStateType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store

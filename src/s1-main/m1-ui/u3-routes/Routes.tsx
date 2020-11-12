import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { LoginPage } from '../../../s2-features/f1-login/l1-ui/LoginPage'
import { Page404 } from './Page404'
import { RegistrationPage } from '../../../s2-features/f2-registration/r1-ui/RegistrationPage'
import { ProfilePage } from '../../../s2-features/f3-profile/p1-ui/ProfilePage'
import { PasswordRecoveryPage } from '../../../s2-features/f4-passwordRecovery/pr1-ui/PasswordRecoveryPage'
import { NewPasswordEntryPage } from '../../../s2-features/f5-newPasswordEntry/npe1-ui/NewPasswordEntryPage'
import { ComponentsTestRack } from '../u0-common/ComponentsTestRack'

export const PATH = {
   LOGIN: '/login',
   REGISTRATION: '/registration',
   PROFILE: '/profile',
   PASSWORD_RECOVERY: '/password-recovery',
   NEW_PASSWORD_ENTRY: '/new-password-entry',
   COMPONENT_TEST_RACK: '/component-test-rack',
}

export const Routes = () => {
   return (
      <Switch>
         <Route path={PATH.LOGIN} exact render={() => <LoginPage />} />
         <Route path={PATH.REGISTRATION} exact render={() => <RegistrationPage />} />
         <Route path={PATH.PROFILE} exact render={() => <ProfilePage />} />
         <Route path={PATH.PASSWORD_RECOVERY} exact render={() => <PasswordRecoveryPage />} />
         <Route path={PATH.NEW_PASSWORD_ENTRY} exact render={() => <NewPasswordEntryPage />} />
         <Route path={PATH.COMPONENT_TEST_RACK} exact render={() => <ComponentsTestRack />} />

         <Route path={'/*'} render={() => <Page404 />} />
      </Switch>
   )
}

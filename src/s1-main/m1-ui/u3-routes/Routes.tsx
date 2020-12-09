import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../../../s2-features/f1-login/l1-ui/LoginPage'
import { Page404 } from './Page404'
import { RegistrationPage } from '../../../s2-features/f2-registration/r1-ui/RegistrationPage'
import { ComponentsTestRack } from '../u0-common/ComponentsTestRack'
import { ProfilePage } from '../../../s2-features/f3-profile/p1-ui/ProfilePage'
import PasswordRecoveryPage from '../../../s2-features/f4-passwordRecovery/pr1-ui/PasswordRecoveryPage'
import NewPasswordEntryPage from '../../../s2-features/f5-newPasswordEntry/npe1-ui/NewPasswordEntryPage'
import { PacksPage } from '../../../s2-features/f6-packs/p1-ui/PacksPage'
import { CardsPage } from '../../../s2-features/f7-cards/c1-ui/CardsPage'
import { LearnPage } from '../../../s2-features/f8-learn/l1-ui/LearnPage'

export const PATH = {
   LOGIN: '/',
   REGISTRATION: '/registration',
   PROFILE: '/profile',
   PASSWORD_RECOVERY: '/password-recovery',
   NEW_PASSWORD_ENTRY: '/set-new-password/:token',
   COMPONENT_TEST_RACK: '/component-test-rack',
   PACKS: '/packs',
   CARDS: '/cards/:id',
   LEARN: '/learn/:id',
}

export const Routes = () => {
   return (
      <Switch>
         <Route path={PATH.LOGIN} exact render={() => <LoginPage />} />
         <Route path={PATH.REGISTRATION} exact render={() => <RegistrationPage />} />
         <Route path={PATH.PROFILE} exact render={() => <ProfilePage />} />
         <Route path={PATH.PASSWORD_RECOVERY} exact render={() => <PasswordRecoveryPage />} />
         <Route path={PATH.NEW_PASSWORD_ENTRY} render={() => <NewPasswordEntryPage />} />
         <Route path={PATH.COMPONENT_TEST_RACK} exact render={() => <ComponentsTestRack />} />
         <Route path={PATH.PACKS} exact render={() => <PacksPage />} />
         <Route path={PATH.CARDS} render={() => <CardsPage />} />
         <Route path={PATH.LEARN} render={() => <LearnPage />} />
         <Route path={'/404'} render={() => <Page404 />} />

         <Redirect from={'*'} to={'/404'} />
      </Switch>
   )
}

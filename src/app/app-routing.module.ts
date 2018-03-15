import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [ AuthGuardService ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash : true }
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

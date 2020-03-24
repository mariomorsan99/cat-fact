import { RouterModule, Routes } from '@angular/router';
import { FactComponent } from './components/fact/fact.component';
import { LoginComponent } from './components/login/login.component';

const AppRoutes: Routes = [
    {path: 'fact', component: FactComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: FactComponent } 
  ];
export const APP_ROUTES = RouterModule.forRoot(AppRoutes, {useHash: true });
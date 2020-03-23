import { RouterModule, Routes } from '@angular/router';
import { FactComponent } from './components/fact/fact.component';

const AppRoutes: Routes = [
    {path: 'fact', component: FactComponent},
    {path: '**', component: FactComponent } 
  ];
export const APP_ROUTES = RouterModule.forRoot(AppRoutes, {useHash: true });
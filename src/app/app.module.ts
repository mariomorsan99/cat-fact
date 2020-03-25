import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactComponent } from './components/fact/fact.component';
import { APP_ROUTES } from './app.router';

import { HeaderComponent } from './shared/header/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar/sidebar.component';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { FactService } from './providers/fact.service';

//Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';
import { EffectsArray } from './ngrx';


@NgModule({
  declarations: [
    AppComponent,
    FactComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    APP_ROUTES,
    FormsModule, 
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot( EffectsArray ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

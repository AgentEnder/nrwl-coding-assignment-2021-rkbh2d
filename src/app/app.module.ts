import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { LayoutModule } from './features/layout/layout.module';
import { SharedModule } from './features/shared';
import { CoreEffects } from './state/cache.effects';
import { coreReducer } from './state/cache.reducer';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({
          cache: coreReducer
        }),
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          //logOnly: environment.production, // Restrict extension to log-only mode
        }),
        EffectsModule.forRoot([CoreEffects]),
        LayoutModule,
        SharedModule,
        MatProgressBarModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

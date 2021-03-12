import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../shared';
import { TicketDetailPageComponent } from './components';

const routes: Routes = [{ path: ":id", component: TicketDetailPageComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [RouterModule],
    declarations: [TicketDetailPageComponent]
})
export class TicketDetailPageModule {}

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../shared';
import { COMPONENTS } from './components';
import {
    TicketsListPageComponent
} from './components/tickets-list-page/tickets-list-page.component';

const routes: Routes = [
    {
        component: TicketsListPageComponent,
        path: "",
    },
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DragDropModule,
        SharedModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
})
export class TicketsListPageModule {}

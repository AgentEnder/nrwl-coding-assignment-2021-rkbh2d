import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { CacheActions, CacheState } from 'src/app/state';

@Component({
    selector: 'app-ticket-creation-dialog',
    templateUrl: './ticket-creation-dialog.component.html',
})
export class TicketCreationDialogComponent implements OnInit {

    f = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(),
        assigneeId: new FormControl()
    })

    users$: Observable<User[]> = EMPTY;

    constructor( public dialogRef: MatDialogRef<TicketCreationDialogComponent>, private store: Store) {
        this.users$ = store.select(CacheState.selectUsers)
     }

    ngOnInit(): void { }

    submit(): void {
        this.store.dispatch(CacheActions.createTicket({ticket: this.f.value}));
        this.dialogRef.close();
    }

    cancel(): void {
        this.f.reset();
        this.dialogRef.close();
    }
}

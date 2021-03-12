import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CacheActions } from 'src/app/state';

@Component({
    selector: 'app-ticket-creation-dialog',
    templateUrl: './ticket-creation-dialog.component.html',
})
export class TicketCreationDialogComponent implements OnInit {

    f = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl()
    })

    constructor( public dialogRef: MatDialogRef<TicketCreationDialogComponent>, private store: Store) { }

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

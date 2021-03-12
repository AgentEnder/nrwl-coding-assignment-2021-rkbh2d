import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import {
    distinctUntilChanged,
    map,
    startWith,
    take,
    takeUntil,
    withLatestFrom,
} from "rxjs/operators";
import { BaseComponent } from "src/app/features/shared/components/base-component/base-component.component";
import { CacheActions, CacheState } from "src/app/state";
import { Ticket, User } from "../../../../models";
import { TicketCreationDialogComponent } from "../ticket-creation-dialog/ticket-creation-dialog.component";

@Component({
    selector: "app-tickets-list-page",
    templateUrl: "./tickets-list-page.component.html",
    styleUrls: ["./tickets-list-page.component.scss"],
})
export class TicketsListPageComponent extends BaseComponent implements OnInit {
    completeTickets: Ticket[];
    incompleteTickets: Ticket[];

    filterFormControl = new FormControl();

    constructor(private store: Store, private dialog: MatDialog) {
        super();

        combineLatest([
            this.filterFormControl.valueChanges.pipe(startWith('')),
            this.store.select(CacheState.selectTickets),
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([filter, tickets]) => {
                this.incompleteTickets = tickets.filter((y) => !y.completed && (this.ticketMatches(y, filter)));
                this.completeTickets = tickets.filter((y) => y.completed && (this.ticketMatches(y, filter)));
            });

        this.store
            .select(CacheState.selectSelectedUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                store.dispatch(CacheActions.loadTickets({ userId: x?.id }));
            });
    }

    ngOnInit(): void {}

    drop(ev: CdkDragDrop<Ticket[]>, complete) {
        if (ev.previousContainer !== ev.container) {
            this.store.dispatch(
                CacheActions.updateTicket({
                    ticket: {
                        ...ev.previousContainer.data[ev.previousIndex],
                        completed: complete,
                    },
                })
            );
            transferArrayItem(
                ev.previousContainer.data,
                ev.container.data,
                ev.previousIndex,
                ev.currentIndex
            );
        }
    }

    ticketMatches(ticket: Ticket, filter: string) {
        return ticket.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || ticket.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    }

    addTicket() {
        this.dialog.open(TicketCreationDialogComponent);
    }
}

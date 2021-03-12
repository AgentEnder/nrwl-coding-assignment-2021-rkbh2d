import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/features/shared";
import { CacheState } from "src/app/state";
import { Ticket, User } from "../../../../models";

@Component({
    selector: "app-ticket-card",
    templateUrl: "./ticket-card.component.html",
    styleUrls: ["./ticket-card.component.scss"],
})
export class TicketCardComponent extends BaseComponent implements OnInit {
    @Input() ticket: Ticket;
    assignee$: Observable<User>;

    constructor(private store: Store) {super()}

    ngOnInit(): void {
        this.assignee$ = this.store.select(
            CacheState.selectUserById(this.ticket.assigneeId)
        ).pipe(
            takeUntil(this.destroy$)
        );
    }
}

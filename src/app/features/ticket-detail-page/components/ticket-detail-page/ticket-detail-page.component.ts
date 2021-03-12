import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, map, startWith, take, takeUntil } from "rxjs/operators";

import { Ticket, User } from "../../../../models";
import { CacheActions, CacheState } from "../../../../state";
import { BaseComponent } from "../../../shared";

@Component({
    selector: "app-ticket-detail-page",
    templateUrl: "./ticket-detail-page.component.html",
})
export class TicketDetailPageComponent extends BaseComponent implements OnInit {
    ticket: Ticket;
    users$: Observable<User[]>;
    users: User[];

    assigneeControl = new FormControl();

    constructor(private route: ActivatedRoute, private store: Store) {
        super();

        route.paramMap
            .pipe(
                map((x) => +x.get("id")),
                takeUntil(this.destroy$)
            )
            .subscribe((x) => {
                this.store.dispatch(CacheActions.selectTicket({ ticketId: x }));
            });

        store
            .select(CacheState.selectSelectedTicket)
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                this.ticket = x;
                this.assigneeControl.setValue(this.ticket?.assigneeId);
            });

        store
            .select(CacheState.selectTickets)
            .pipe(take(1))
            .subscribe((x) => {
                if (x.length === 0) {
                    this.store.dispatch(CacheActions.loadTickets({}));
                }
            });

        const storedUsers = store.select(CacheState.selectUsers);

        this.users$ = combineLatest([
            storedUsers,
            this.assigneeControl.valueChanges.pipe(startWith("")),
        ]).pipe(
            filter(
                ([users, filterValue]) => users && filterValue !== undefined
            ),
            map(([users, filterValue]) => filterUsers(users, filterValue)),
            takeUntil(this.destroy$)
        );
        storedUsers.subscribe((x) => (this.users = x));

        this.assigneeControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => {
                var id = typeof x === "number" ? x : null;
                if ((x !== this.ticket?.assigneeId) && this.ticket?.id !== undefined && id !== undefined) {
                    this.store.dispatch(
                        CacheActions.updateTicket({
                            ticket: {
                                ...this.ticket,
                                assigneeId: id,
                            },
                        })
                    );
                }
            });
    }

    ngOnInit(): void {}

    displayWithFn = (id) => this.users?.find((x) => x.id === id)?.name;
}

function filterUsers(users: User[], filterValue: any): any {
    if (typeof filterValue === "number") {
        return users.filter((x) => x.id === filterValue);
    }
    return users.filter((x) =>
        x.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    );
}

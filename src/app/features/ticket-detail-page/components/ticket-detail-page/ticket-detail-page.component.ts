import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Store } from "@ngrx/store";
import { combineLatest, EMPTY, Observable } from "rxjs";
import {
    filter,
    map,
    startWith,
    take,
    takeUntil,
    tap,
    withLatestFrom,
} from "rxjs/operators";

import { Ticket, User } from "../../../../models";
import { CacheActions, CacheState } from "../../../../state";
import { BaseComponent } from "../../../shared";

@Component({
    selector: "app-ticket-detail-page",
    templateUrl: "./ticket-detail-page.component.html",
})
export class TicketDetailPageComponent extends BaseComponent implements OnInit {
    ticket$: Observable<Ticket> = EMPTY;
    selectedTicketId$: Observable<number>;
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

        this.store.dispatch(CacheActions.ticketDetailPageLoaded());

        const storedUsers = store.select(CacheState.selectUsers);
        storedUsers.subscribe(x => this.users = x);

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

        this.assigneeControl.valueChanges
            .pipe(withLatestFrom(this.ticket$), takeUntil(this.destroy$))
            .subscribe(([x, ticket]) => {
                var id = typeof x === "number" ? x : null;
                if (
                    x !== ticket?.assigneeId &&
                    ticket?.id !== undefined &&
                    id !== undefined
                ) {
                    this.store.dispatch(
                        CacheActions.updateTicket({
                            ticket: {
                                ...ticket,
                                assigneeId: id,
                            },
                        })
                    );
                }
            });
    }

    ngOnInit(): void {
        this.ticket$ = this.store.select(CacheState.selectSelectedTicket).pipe(
            tap((ticket) => {
                this.assigneeControl.setValue(ticket?.assigneeId);
            })
        );
    }

    displayWithFn = (id) => {
        return this.users?.find((x) => x.id === id)?.name;
    }
}

function filterUsers(users: User[], filterValue: any): any {
    if (typeof filterValue === "number") {
        return users.filter((x) => x.id === filterValue);
    }
    return users.filter((x) =>
        x.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    );
}

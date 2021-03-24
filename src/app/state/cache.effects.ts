import { Injectable } from "@angular/core";
import { tick } from "@angular/core/testing";

import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, filter, map, switchMap, withLatestFrom } from "rxjs/operators";

import { BackendService } from "../backend.service";
import { CacheActions } from "./cache.actions";
import { CacheState } from "./cache.state";

@Injectable({
    providedIn: "root",
})
export class CoreEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private backendService: BackendService,
        private store: Store
    ) {}

    ngrxOnInitEffects(): Action {
        return CacheActions.loadUsers();
    }

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CacheActions.loadUsers),
            switchMap(() =>
                this.backendService.users().pipe(
                    map((users) => CacheActions.loadUsersSuccess({ users })),
                    catchError((error) =>
                        of(CacheActions.loadUsersFailed({ error }))
                    )
                )
            )
        );
    });

    loadTickets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CacheActions.loadTickets),
            switchMap(({ userId }) =>
                this.backendService.tickets().pipe(
                    map((tickets) => {
                        if (userId) {
                            tickets = tickets.filter(
                                (x) => x.assigneeId === userId
                            );
                        }
                        return CacheActions.loadTicketsSuccess({ tickets });
                    }),
                    catchError((error) =>
                        of(CacheActions.loadTicketsFailed({ error }))
                    )
                )
            )
        );
    });

    updateTicket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CacheActions.updateTicket),
            switchMap(({ ticket }) => {
                return this.backendService.update(ticket.id, ticket).pipe(
                    map((ticket) => {
                        return CacheActions.updateTicketSuccess({ ticket });
                    }),
                    catchError((error) =>
                        of(CacheActions.updateTicketFailed({ error }))
                    )
                );
            })
        );
    });
    
    createTicket$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CacheActions.createTicket),
            switchMap(({ ticket }) => {
                return this.backendService.newTicket(ticket).pipe(
                    map((ticket) => {
                        return CacheActions.createTicketSuccess({ ticket });
                    }),
                    catchError((error) =>
                        of(CacheActions.createTicketFailed({ error }))
                    )
                );
            })
        );
    });

    loadTicketsOnDetailPageLoadIfNotLoaded$ = createEffect(() => {
        return this.actions$.pipe(
                ofType(CacheActions.ticketDetailPageLoaded),
                withLatestFrom(this.store.select(CacheState.selectTickets)),
                filter(([action, tickets]) => tickets.length === 0),
                map(x => CacheActions.loadTickets({})));
    });
}

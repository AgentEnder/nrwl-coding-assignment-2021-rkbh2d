import { createReducer, on } from "@ngrx/store";
import { CacheActions } from "./cache.actions";
import { CacheState } from "./cache.state";

export const coreReducer = createReducer(
    CacheState.initialState,
    on(CacheActions.loadTickets, (state) => ({
        ...state,
        loadingTickets: true,
    })),
    on(CacheActions.loadTicketsSuccess, (state, { tickets }) => ({
        ...state,
        loadedTickets: tickets.reduce((dict, entry) => {dict[entry.id] = entry; return dict}, {}),
        loadingTickets: false
    })),
    on(CacheActions.updateTicket, (state) => ({
        ...state,
        loadingTickets: true
    })),
    on(CacheActions.updateTicketSuccess, (state, { ticket }) => ({
        ...state,
        loadedTickets: {...state.loadedTickets, [ticket.id]: ticket},
        loadingTickets: false
    })),
    on(CacheActions.createTicketSuccess, (state, { ticket }) => ({
        ...state,
        loadedTickets: {...state.loadedTickets, [ticket.id]: ticket},
        loadingTickets: false
    })),
    on(CacheActions.loadTicketsFailed, (state, { error }) => ({
        ...state,
        loadingTickets: false
    })),
    on(CacheActions.selectTicket, (state, { ticketId }) => ({
        ...state,
        selectedTicket: ticketId
    })),
    on(CacheActions.loadUsers, (state) => ({
        ...state,
        loadingUsers: true,
    })),
    on(CacheActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        loadedUsers: users.reduce((dict, entry) => {dict[entry.id] = entry; return dict}, {}),
        loadingUsers: false
    })),
    on(CacheActions.loadUsersFailed, (state, { error }) => ({
        ...state,
        loadingUsers: false
    })),
    on(CacheActions.selectUser, (state, { userId }) => ({
        ...state,
        selectedUser: userId
    })),
);

import { createAction, props } from "@ngrx/store";
import { TicketCreationDTO } from "../backend.service";
import { Ticket, User } from "../models";

export namespace CacheActions {
    export const selectTicket = createAction('[@app/core] select ticket', props<{ticketId: number}>());
    export const loadTickets = createAction('[@app/core] load tickets', props<{userId?: number}>());
    export const loadTicketsSuccess = createAction('[@app/core] load tickets success', props<{tickets: Ticket[]}>());
    export const loadTicketsFailed = createAction('[@app/core] load tickets failed', props<{error: any}>());
    
    export const updateTicket = createAction('[@app/core] update ticket', props<{ticket: Ticket}>());
    export const updateTicketSuccess = createAction('[@app/core] update ticket success', props<{ticket: Ticket}>());
    export const updateTicketFailed = createAction('[@app/core] update ticket failed', props<{error: any}>());
    
    export const createTicket = createAction('[@app/core] create ticket', props<{ticket: TicketCreationDTO}>());
    export const createTicketSuccess = createAction('[@app/core] create ticket success', props<{ticket: Ticket}>());
    export const createTicketFailed = createAction('[@app/core] create ticket failed', props<{error: any}>());
    
    export const selectUser = createAction('[@app/core] select user', props<{userId: number}>());
    export const loadUsers = createAction('[@app/core] load users');
    export const loadUsersSuccess = createAction('[@app/core] load users success', props<{users: User[]}>());
    export const loadUsersFailed = createAction('[@app/core] load users failed', props<{error: any}>());
}
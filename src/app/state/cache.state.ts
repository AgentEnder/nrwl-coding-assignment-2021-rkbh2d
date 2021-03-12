import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from "@ngrx/store";
import { Ticket, User } from "../models";

export namespace CacheState {
    export interface State {
        loadedTickets: { [id: number]: Ticket };
        loadingTickets: boolean;
        selectedTicket?: number;

        loadedUsers: { [id: number]: User };
        loadingUsers: boolean;
        selectedUser?: number;
    }

    export const initialState: State = {
        loadedTickets: {},
        loadedUsers: {},
        loadingTickets: false,
        loadingUsers: false,
    };

    export const selectCacheState = createFeatureSelector("cache");

    export const selectTickets = createSelector(
        selectCacheState,
        (state: State) => Object.values(state.loadedTickets)
    );

    export const selectLoadingTickets = createSelector(
        selectCacheState,
        (state: State) => state.loadingTickets
    );

    export const selectSelectedTicket = createSelector(
        selectCacheState,
        (state: State) => state.loadedTickets[state.selectedTicket]
    );

    export const selectUsers = createSelector(
        selectCacheState,
        (state: State) => Object.values(state.loadedUsers)
    );

    export const selectLoadingUsers = createSelector(
        selectCacheState,
        (state: State) => state.loadingUsers
    );

    export const selectSelectedUser = createSelector(
        selectCacheState,
        (state: State) => state.loadedUsers[state.selectedUser]
    );

    const idSelectors: { [id: number]: MemoizedSelector<State, User> } = {};
    export const selectUserById = (id) => {
        if (!(id in idSelectors)) {
            idSelectors[id] = createSelector(
                selectCacheState,
                (state: State) => state.loadedUsers[id]
            );
        }
        return idSelectors[id];
    };
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {BackendService} from './backend.service';
import { CacheState } from './state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$: Observable<boolean>

  constructor(private store: Store) {
    this.loading$ = store.select(CacheState.selectCacheState).pipe(
      map((x: CacheState.State) => x.loadingUsers || x.loadingTickets)
    )
  }
}

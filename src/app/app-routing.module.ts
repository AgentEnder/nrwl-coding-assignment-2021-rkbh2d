import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent, NotFoundPageModule } from './features/not-found-page';

const routes: Routes = [
  { path: '', redirectTo: '/tickets-list', pathMatch: 'full' },
  { path: 'tickets-list', loadChildren: () => import('./features/tickets-list-page/tickets-list-page.module').then(m => m.TicketsListPageModule) },
  { path: 'tickets', loadChildren: () => import('./features/ticket-detail-page/ticket-detail-page.module').then(m => m.TicketDetailPageModule) },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotFoundPageModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}

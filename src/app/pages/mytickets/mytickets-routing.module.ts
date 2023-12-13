import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyticketsPage } from './mytickets.page';

const routes: Routes = [
  {
    path: '',
    component: MyticketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyticketsPageRoutingModule {}

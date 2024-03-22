import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolasPage } from './escolas.page';

const routes: Routes = [
  {
    path: '',
    component: EscolasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolasPageRoutingModule {}

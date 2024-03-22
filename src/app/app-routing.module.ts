import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagina-inicial',
    pathMatch: 'full'
  },
  {
    path: 'escolas',
    loadChildren: () => import('./pages/escolas/escolas.module').then( m => m.EscolasPageModule)
  },
  {
    path: 'pagina-inicial',
    loadChildren: () => import('./pages/pagina-inicial/pagina-inicial.module').then( m => m.PaginaInicialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'turmas',
    loadChildren: () => import('./pages/turmas/turmas.module').then( m => m.TurmasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

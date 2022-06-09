import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { MainLayoutComponent } from './core/components/layouts/main-layout/main-layout.component';
import { RoutesPreloadingStrategy } from './utils/routes-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.module').then((m) => m.AboutModule),
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

const config: ExtraOptions = {
  preloadingStrategy: RoutesPreloadingStrategy,
  enableTracing: false,
  scrollPositionRestoration: 'top',
  relativeLinkResolution: 'legacy',
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  providers: [RoutesPreloadingStrategy],
  exports: [RouterModule],
})
export class AppRoutingModule {}

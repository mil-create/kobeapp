import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',  
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./pages/stats/stats.page').then((m) => m.StatsPage),
  },
  {
    path: 'workouts',
    loadComponent: () =>
      import('./pages/workouts/workouts.page').then((m) => m.WorkoutsPage),
  },
  {
    path: 'merch',
    loadComponent: () =>
      import('./pages/merch/merch.page').then((m) => m.MerchPage),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account/account.page').then((m) => m.AccountPage),
  },
  {
    path: 'loader',
    loadComponent: () =>
      import('./pages/loader/loader.page').then((m) => m.LoaderPage),
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'merch',
    loadComponent: () => import('./pages/merch/merch.page').then( m => m.MerchPage)
  },
];
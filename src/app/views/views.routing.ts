import { Routes, RouterModule }  from '@angular/router';
import { ViewsComponent } from './views.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/views/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'views',
    component: ViewsComponent,
    children: [
      { path: '', redirectTo: 'monitor', pathMatch: 'full' },
      { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule' },
      { path: 'user-list', loadChildren: './user-list/user-list.module#UserListModule' },
      { path: 'feed/new-feed', loadChildren: './new-feed/new-feed.module#NewFeedModule' },
      { path: 'feed/feed-list', loadChildren: './feed-list/feed-list.module#FeedListModule' },
      { path: 'gm/mail', loadChildren: './mail/mail.module#MailModule' },
      { path: 'gm/reset', loadChildren: './reset-account/reset-account.module#ResetAccountModule' },
      { path: 'setting/reload', loadChildren: './setting/setting.module#SettingModule' },
      //{ path: 'system-notification', loadChildren: './system-notification/system-notification.module#SystemNotificationModule' },
      //{ path: 'user-list', loadChildren: './user-list/user-list.module#UserListModule' },
      //{ path: 'money-log', loadChildren: './money-log/money-log.module#MoneyLogModule' }
      //{ path: 'maps', loadChildren: './maps/maps.module#MapsModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

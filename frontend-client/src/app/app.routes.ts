import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { HiveList } from './pages/hives/hive-list/hive-list';
import { HiveDetail} from './pages/hives/hive-detail/hive-detail';
import { ApiaryList } from './pages/apiaries/apiary-list/apiary-list';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: Dashboard },
  { path: 'ruches', component: HiveList },
  { path: 'ruches/:id', component: HiveDetail },
  { path: 'ruchers', component: ApiaryList},
];

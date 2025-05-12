import {Routes} from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'search/:query',
      component: SearchListComponent,
      title: 'Search List',
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Movie Details',
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login',
    },
  ];
  export default routeConfig;
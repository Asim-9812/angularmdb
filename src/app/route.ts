import {Routes} from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SearchListComponent } from './search-list/search-list.component';


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
  ];
  export default routeConfig;
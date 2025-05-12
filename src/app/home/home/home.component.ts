import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth_services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'WOM';

  isLoggedIn = false;

  authService: AuthService  = inject(AuthService); // Replace with actual AuthService type

  constructor(private router: Router) {
    // Proper reactive auth state tracking
  this.authService.getAuthState().subscribe(user => {
    this.isLoggedIn = !!user;
  });
}


  searchForm = new FormGroup({
    searchText : new FormControl('',Validators.required)
  });

  onSearch() {
    const searchText = this.searchForm.get('searchText')?.value;
    if (!searchText) { 
      alert('Search text is required');
      return;
    }



    this.router.navigate(['/search', searchText]);
    
    // Perform the search action here
    console.log('Search text:', searchText);
  }

  login() {
    this.router.navigate(['/login']);  
  }

  // Add any properties or methods you need for your component here
}

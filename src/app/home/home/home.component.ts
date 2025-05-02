import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'WOM';

  constructor(private router: Router) {}


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
  // Add any properties or methods you need for your component here
}

import { Component, inject} from '@angular/core';
import { Movie, MovieSearchResponse } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie_services/movie.service';
import path from 'path';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent {


  route : ActivatedRoute = inject(ActivatedRoute);
  searchText: string = this.route.snapshot.params['query'];

  searchedMovies: Movie[] = [];

  movieService: MovieService = inject(MovieService);

  searchForm = new FormGroup({
    searchText : new FormControl(this.searchText)
  });

  constructor() {
    // Simulate a search result
    this.movieService.getMovieBySearch(this.searchText).then((response: MovieSearchResponse | undefined) => {
      if (response) {
        this.searchedMovies = response.Search;
      } else {
        console.error('No movies found for the search term:', this.searchText);
      }
    });
  }


  onSearch() {
    const newSearchText = this.searchForm.get('searchText')?.value;

    if (!newSearchText) { 
      alert('Search text is required');
      return;
    }

    this.searchText = newSearchText;

    this.movieService.getMovieBySearch(this.searchText).then((response: MovieSearchResponse | undefined) => {
      if (response) {
        this.searchedMovies = response.Search;
      } else {
        console.error('No movies found for the search term:', this.searchText);
      }
    });

  }

}

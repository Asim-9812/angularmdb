import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { Movie , MovieDetail, MovieSearchResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = environment.baseUrl;

  async getMovieBySearch(search: string): Promise<MovieSearchResponse | undefined> {
    const url = `${this.baseUrl}s=${search}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }
    const data = await response.json();
    if (data.Response === 'True') {
      return data as MovieSearchResponse;
    } else {
      console.error('Error fetching movie data:', data.Error);
      return undefined;
    }

  }

  async getMovieDetails(id: string): Promise<MovieDetail | undefined> {
    const url = `${this.baseUrl}i=${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok' + response.statusText);
    }
    const data = await response.json();
    if (data.Response === 'True') {
      return data as MovieDetail;
    } else {
      console.error('Error fetching movie data:', data.Error);
      return undefined;
    }

  }



  constructor() { }
}

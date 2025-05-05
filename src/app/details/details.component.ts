import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { MovieDetail } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  id = '';
  title = '';

  movieDetail: MovieDetail | undefined;


  detailService: MovieService = inject(MovieService);

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.title = params.get('title')!;
      this.id = params.get('id')!;
    });

    this.detailService.getMovieDetails(this.route.snapshot.params['id']).then((response: MovieDetail | undefined) => {
      if (response) {
        this.movieDetail = response;
      } else {
        console.error('No movie found for the id:', this.id);
      }
    });

  }

}

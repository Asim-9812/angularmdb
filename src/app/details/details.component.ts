import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { MovieDetail } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie_services/movie.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth_services/auth.service';
import { Firestore, collection, setDoc, doc, getDoc } from '@angular/fire/firestore';




@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  id = '';
  title = '';

  userEmail = ''; // Placeholder for username, if needed



  movieDetail: MovieDetail | undefined;

  rating = 0;  // Default rating value
  stars = new Array(5);  // Creates an array of 5 stars

  rateMovie(rating: number) {
    this.rating = rating;  // Set the rating when user clicks a star
  }

  isLoggedIn = false;

  authService: AuthService = inject(AuthService); // Replace with actual AuthService type
  // Check if the user is logged in


  detailService: MovieService = inject(MovieService);

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
    this.route.queryParamMap.subscribe(params => {
      this.title = params.get('title')!;
    });
    this.id = this.route.snapshot.params['id'];

    console.log('Movie ID:', this.id);
    console.log('Movie Title:', this.title);

    this.detailService.getMovieDetails(this.route.snapshot.params['id']).then((response: MovieDetail | undefined) => {
      if (response) {
        this.movieDetail = response;
        this.loadExistingRating();
      } else {
        console.error('No movie found for the id:', this.id);
      }
    });

    // Proper reactive auth state tracking
    this.authService.getAuthState().subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userEmail = user.email!; // Assuming user object has an email property
        this.loadExistingRating(); 
      } else {
        this.userEmail = ''; // Reset email if not logged in
        this.rating = 0; // Reset rating if not logged in
      }
    });

  }

  async submitRating() {
    if (!this.isLoggedIn) {
      alert('Please log in to submit a rating.');
      return;
    }
  
    try {
      const ratingsRef = collection(this.firestore, this.userEmail);
      const ratingDoc = doc(ratingsRef, this.id); // Use OMDb id as document ID
  
       // Merge existing fields if the document exists, or create a new document if not
    await setDoc(ratingDoc, {
      omdbId: this.id,
      title: this.title,
      rating: this.rating
    }, { merge: true });
  
      alert(`Rating submitted: ${this.rating} stars`);
    } catch (error) {
      console.error('Failed to submit rating:', error);
      alert('Error submitting rating. Please try again.');
    }
  }

  async loadExistingRating() {
    if (!this.userEmail || !this.id) return;
  
    const ratingDoc = doc(this.firestore, this.userEmail, this.id);
  
    try {
      const snapshot = await getDoc(ratingDoc);
      if (snapshot.exists()) {
        const data = snapshot.data();
        this.rating = data['rating']; // Set the saved rating to show in UI
      }
    } catch (error) {
      console.error('Failed to load existing rating:', error);
    }
  }
  
  

}

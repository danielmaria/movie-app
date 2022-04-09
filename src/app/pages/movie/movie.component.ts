import { IMAGES_SIZES } from './../../components/constants/image-size';
import { Movie, MovieVideo, MovieImages, MovieCredits } from './../../models/movie';
import { MovieService } from './../../services/movie.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  imageSizes = IMAGES_SIZES;
  movie: Movie = null!;
  movieVideos: MovieVideo[] | null = null;
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] | null = null;

  constructor(private router: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.router.params.pipe(first()).subscribe(({id}) => {
      this.searchMovieById(id);
      this.searchVideos(id);
      this.searchImages(id);
      this.searchCredits(id);
      this.searchSimilarMovies(id);
    })
  }

  ngOnDestroy(): void {
    
  }

  private searchImages(id: string) {
    this.movieService.getMovieImages(id).subscribe(images => this.movieImages = images);
  }

  private searchVideos(id: string) {
    this.movieService.getMovieVideos(id).subscribe(video => this.movieVideos = video);
  }

  private searchCredits(id: string) {
    this.movieService.getMovieCredits(id).subscribe(credits => {
      this.movieCredits = credits;
    });
  }

  private searchMovieById(id: any) {
    this.movieService.getMovieById(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  private searchSimilarMovies(id: string) {
    this.movieService.getSimilarMovies(id).subscribe(similarMovies => {
      this.similarMovies = similarMovies;
      console.log(similarMovies)
    });
  }
}

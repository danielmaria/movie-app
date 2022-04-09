import { ActivatedRoute } from '@angular/router';
import { Movie } from './../../models/movie';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] | null = null;
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private movieService: MovieService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.pipe(take(1)).subscribe(({genreId}) => {
      this.genreId = genreId;
      if(genreId) {
        this.searchMoviesByGenreId(genreId);
      } else {
        this.searchPagedMovies(1);
      }
    })
  }

  private searchPagedMovies(page: number, searchValue?: string) {
    this.movieService.getMoviesPaginated(page, searchValue).subscribe(movies => this.movies = movies);
  }

  private searchMoviesByGenreId(genreId: string, page: number = 1) {
    this.movieService.getMoviesByGenreId(genreId, page).subscribe(movies => this.movies = movies);
  }


  paginate(event: any) {
    if(this.genreId) {
      this.searchMoviesByGenreId(this.genreId, ++event.page);
    } else {
      if(this.searchValue) {
        this.searchPagedMovies(++event.page, this.searchValue)
      } else {
        this.searchPagedMovies(++event.page)
      }
    }
  }

  searchChange() {
    this.searchPagedMovies(1, this.searchValue!);
  }
}

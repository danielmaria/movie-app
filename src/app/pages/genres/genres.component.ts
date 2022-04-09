import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres: Genre[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovieGenres().subscribe(g => this.genres = g)
  }

}

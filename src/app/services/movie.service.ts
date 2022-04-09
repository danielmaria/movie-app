import { environment } from './../../environments/environment.prod';
import { GenresDto, Genre } from './../models/genre';
import { Movie, MovieDto, MovieVideoDto, MovieVideo, MovieImages, MovieCredits } from './../models/movie';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieBaseUrl = environment.apiMovieURL;
  private movieApiVersion = environment.apiMovieVersion;
  baseUrl: string = `${this.movieBaseUrl}${this.movieApiVersion}`
  apiKey: string = environment.apiMovieKey;

  constructor(private http: HttpClient) { }

  public getMovies(type: string = 'upcoming', count: number = 6): Observable<Movie[]> {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  public getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  public getMoviesPaginated(page: number = 1, movieTitle?: string): Observable<Movie[]> {
    const uri = movieTitle ? '/search/movie' : '/movie/popular'
    return this.http.get<MovieDto>(`${this.baseUrl}${uri}?api_key=${this.apiKey}&page=${page}&query=${movieTitle}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  public getMoviesByGenreId(genreId: string, page: number = 1): Observable<Movie[]> {
    return this.http.get<MovieDto>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  public getMovieVideos(id: string): Observable<MovieVideo[]> {
    return this.http
      .get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  public getMovieImages(id: string): Observable<MovieImages> {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }
  

  public getMovieCredits(id: string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  public getSimilarMovies(id: string): Observable<Movie[]> {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  public getMovieGenres(): Observable<Genre[]> {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }
}

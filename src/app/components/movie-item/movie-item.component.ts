import { IMAGES_SIZES } from './../constants/image-size';
import { Movie } from './../../models/movie';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  
  @Input() item: Movie | null = null;
  readonly imageSize = IMAGES_SIZES;

  constructor() { }

  ngOnInit(): void {
  }

}

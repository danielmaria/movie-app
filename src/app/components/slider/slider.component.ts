import { IMAGES_SIZES } from './../constants/image-size';
import { Movie } from './../../models/movie';
import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({opacity: 0})),
      transition('void => *', [animate('1s')]),
      transition('* => void', [animate('500ms')])
    ])
  ]
})
export class SliderComponent implements OnInit {

  @Input() items: Movie[] = [];
  @Input() static: boolean = false;

  currentSlideIndex: number = 0;
  readonly imageSize = IMAGES_SIZES;

  ngOnInit(): void {
    if(!this.static) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length
      }, 5000)
    }
  }

}

import { Movie } from './../../models/movie';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {

  @Input() items: Movie[] | null = [];
  @Input() titleBanner = 'Title Banner'
  
  constructor() { }


}

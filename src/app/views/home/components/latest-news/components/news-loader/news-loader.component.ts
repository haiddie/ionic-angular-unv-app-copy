import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-loader',
  templateUrl: './news-loader.component.html',
  styleUrls: ['./news-loader.component.scss'],
})
export class NewsLoaderComponent implements OnInit {

  constructor() { }

  temp: string[] = ['','','','','','','','','','','']

  ngOnInit() {}

}

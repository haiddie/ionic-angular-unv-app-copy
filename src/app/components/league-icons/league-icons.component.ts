import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-icons',
  templateUrl: './league-icons.component.html',
  styleUrls: ['./league-icons.component.scss'],
})
export class LeagueIconsComponent implements OnInit {
  @Input() leagueName: string;
  @Input() color1?: string = null;
  @Input() color2?: string = null;
  @Input() slug?: string = null;
  @Input() height?:string=null;
  @Input() width?:string=null;

  NFL_DefaultColors: { color1: string, color2: string } = { color1: "#0a2265", color2: "#a71930" }
  NHL_DefaultColors: { color1: string, color2: string } = { color1: "#000000", color2: "#afb7ba" }
  NBA_DefaultColors: { color1: string, color2: string } = { color1: "#ee174c", color2: "#016ab6" }
  MLB_DefaultColors: { color1: string, color2: string } = { color1: "#284898", color2: "#e81829" }

  constructor() { }

  ngOnInit() {
  }

}

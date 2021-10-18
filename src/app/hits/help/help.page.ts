import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  tab = 'about';
  segment: string;

  constructor() { }

  ngOnInit() {
  }

  onChangeTab(data: any) {
    console.log(data.detail);
  }
}

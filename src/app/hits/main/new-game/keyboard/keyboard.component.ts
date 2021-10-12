import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  isOdabran: boolean[] = [false, false, false, false, false, false, false, false, false, false];

  constructor() { }

  ngOnInit() {}

  onSelectNumber(n: number) {
    this.isOdabran[n]=true;
  }

  onCancel() {
    this.isOdabran = [false, false, false, false, false, false, false, false, false, false];
  }

}

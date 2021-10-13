/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hit } from '../../../hits.model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Output('newEnterNumber')
  public newEnterNumber: EventEmitter<number[]> = new EventEmitter();
  @Output('finishEnterNumber')
  public finishEnterNumber: EventEmitter<void> = new EventEmitter();

  @Input('hits')
  public hits: Hit[];

  public nums: number[] = [];
  private total = 0;

  isOdabran: boolean[] = [false, false, false, false, false, false, false, false, false, false];

  constructor() { }

  ngOnInit() {}

  onSelectNumber(n: number) {
    if (this.total >= 4) {
      return;
    }
    this.total++;
    console.log('n:', n);
    this.nums.push(n);
    this.isOdabran[n]=true;
    this.newEnterNumber.emit(this.nums);
  }

  onOk() {
    this.finishEnterNumber.emit();
    this.isOdabran = [false, false, false, false, false, false, false, false, false, false];
    this.total = 0;
    this.nums = [];
  }

  onCancel() {
    this.isOdabran = [false, false, false, false, false, false, false, false, false, false];
    this.total = 0;
    this.nums = [];
    this.newEnterNumber.emit(this.nums);
  }

}

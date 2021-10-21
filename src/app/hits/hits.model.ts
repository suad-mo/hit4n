/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
export class Hit {
  constructor(
    public aaaa: {
      a: number;
      p: boolean;
      t: boolean;
    }[],
    public place: number,
    public total: number
  ) { }
}

export class HitGame {
  private _xxxx: number[] = [];
  public hits: Hit[] = [];
  public isFinish = false;
  public start = new Date();
  public end = new Date();
  public isBingo = false;
  public duration = 0;

  constructor(public gamer: string) {
    this.generateXXXX();
  }

  public getClone(){
    return {
      gamer: this.gamer,
      _xxxx: this._xxxx,
      hits: this.hits,
      isFinish: this.isFinish,
      start: this.start,
      end: this.end,
      isBingo: this.end,
      duration: this.duration
    };
  }
  public get xxxx() {
    return this._xxxx.slice();
  }

  public setStart() {
    this.start = new Date();
  }

  public getDuration(): number {
    return this.end.getTime() - this.start.getTime();
  }

  public addHit(nums: number[]) {
    if (nums.length < 4) {
      return;
    }
    const aaa: {
      a: number;
      p: boolean;
      t: boolean;
    }[] = nums.map((n) => ({
      a: n,
      p: false,
      t: false,
    }));

    if (this.isBingo) {
      return;
    }
    let place = 0;
    let total = 0;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < aaa.length; i++) {
      const a = aaa[i];
      const c = this.xxxx[i];
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < this.xxxx.length; j++) {
        const b = this.xxxx[j];
        if (a.a === b) {
          a.t = true;
          total++;
        }
      }
      if (a.a === c) {
        a.p = true;
        place++;
      }
    }
    const hit = new Hit(aaa, place, total);
    this.hits.push(hit);
    if (place === 4) {
      this.isBingo = true;
      this.setEnd();
      this.setDuration();
    }
  }

  private setEnd() {
    this.end = new Date();
  }

  private setDuration() {
    this.duration = this.end.getTime() - this.start.getTime();
  }

  private generateXXXX(): void {
    const initArray: number[] = [];
    for (let i = 0; i < 10; i++) {
      initArray.push(i);
    }
    let len = 10;
    for (let i = 0; i < 4; i++) {
      const last = len - 1;
      const x = Math.floor(Math.random() * len); //broj od 0-len
      const elementX = initArray[x];
      const elementLast = initArray[last];
      initArray[x] = elementLast;
      initArray[last] = elementX;
      --len;
    }
    // eslint-disable-next-line no-underscore-dangle
    this._xxxx = [...initArray.slice(6)];
  }
}

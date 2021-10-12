/* eslint-disable @typescript-eslint/member-ordering */
export class Hit {
  constructor(
    public xxxx: number[],
    public place: number,
    public total: number,
  ) { }
}

export class HitGame {
  private xxxx: number[];
  public hits: Hit[];
  public isFinish = false;
  public start = new Date();
  public end = new Date();
  constructor(
    public gamer: string
  ) {
    this.generateXXXX();
    this.start = new Date();
    this.hits = [];
  }

  public setStart() {
    this.start = new Date();
  }

  public setEnd() {
    this.end = new Date();
  }

  private generateXXXX() {
    const initArray: number[] = [];
    for (let i = 0; i < 10; i++) {
      initArray.push(i);
    }
    let len = 10;
    for (let i = 0; i < 4; i++) {
      const last = len - 1;
      const x = Math.floor(Math.random() * len);//broj od 0-len
      const elementX = initArray[x];
      const elementLast = initArray[last];
      initArray[x] = elementLast;
      initArray[last] = elementX;
      --len;
    }
    this.xxxx = initArray.slice(6);
  }
}

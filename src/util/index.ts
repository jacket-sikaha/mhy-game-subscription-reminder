class name {
  b: number;
  constructor(public a: number) {}
  aa() {
    this.b = this.a;
    this.a = Math.random();
  }
}

const asd = new name(1);
console.log('123123', asd);

export default asd;

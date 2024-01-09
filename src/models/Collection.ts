export default class Collection {

  private title: string;
  private data: number[];
  private date: string;

  constructor(title: string, data: number[], date: string) {
    this.title = title;
    this.data = data;
    this.date = date;
  }

  getData() {
    return { title: this.title, data: this.data, date: this.date };
  }
}
export default class User {

  private id: string;
  private name: string;
  private image: string;
  
  constructor(id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }
}
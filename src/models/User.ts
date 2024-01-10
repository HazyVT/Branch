export default class User {

  private id: string;
  private name: string;
  private image: string;
  private email: string;
  private created: string;
  
  constructor(id: string, name: string, image: string, email: string, created: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.email = email;
    this.created = created;
  }

  getData() { 
    return { id: this.id, name: this.name, image: this.image, email: this.email};
  }

  getCreated() {
    return this.created;
  }

  setImage(image: string) {
    this.image = image;
  }


}
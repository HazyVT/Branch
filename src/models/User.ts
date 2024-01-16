export default class User {

  private id: string;
  private name: string;
  private image: string;
  private banner: string;
  
  constructor(id: string, name: string, image: string, banner: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.banner = banner;
  }

 

  getData() {
    return { id: this.id, name: this.name, image: this.image, banner: this.banner};
  }
}
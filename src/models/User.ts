import Collection from "./Collection";

export default class User {

  private id: string;
  private name: string;
  private image: string;
  private collections: Map<string, Collection> = new Map();
  
  constructor(id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }

  getData() { 
    return { id: this.id, name: this.name, image: this.image};
  }

  addCollection(k: string, v: Collection) {
    this.collections = new Map(this.collections.set(k, v))
  }
  
  getCollections() {
    return this.collections;
  }


}
export default class Project {

  private id: string;
  private name: string;
  private created_at: string
  
  constructor(id: string, name: string, created_at: string) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCreatedAt() {
    return this.created_at;
  }
}
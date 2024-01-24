import { IconType } from "react-icons/lib";

export default class Project {

  private id: string;
  private name: string;
  private created_at: string
  private color: string;
  private shape: IconType;
  
  constructor(id: string, name: string, created_at: string) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
  }

  setMeta(color: string, shape: IconType) {
    this.color = color;
    this.shape = shape;
  }

  getMeta() {
    return { color: this.color, shape: this.shape};
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
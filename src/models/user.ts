export class User {
    private name: string;
    private id: string;
    private email: string;
    private image: string;

    constructor(name: string, id: string, email: string, image: string) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.image = image;

    }

    getData() {
        return { name: this.name, id: this.id, email: this.email, image: this.image};
    }
}
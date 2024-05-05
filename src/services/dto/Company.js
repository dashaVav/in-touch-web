export class Company {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json) {
        return new Company(
            json.id,
            json.name
        )
    }
}
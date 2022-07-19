export class Item {
    id: number;
    name: string;
    count: number;
    price: number;

    constructor(id: number, name: string, count: number, price: number) {
        this.id = id;
        this.name = name;
        this.count = count;
        this.price = price;
    }
}
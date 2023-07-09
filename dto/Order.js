export class Order {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get itemList() {
        return this._itemList;
    }

    set itemList(value) {
        this._itemList = value;
    }
    constructor(id, customer, date, total,itemList) {
        this._id = id;
        this._customer = customer;
        this._date = date;
        this._total = total;
        this._itemList = itemList;
    }
}
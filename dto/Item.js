export class Item {
    constructor(code, description, price, qtyOnHand
    ) {
        this._code = code;
        this._description = description;
        this._price = price;
        this._qtyOnHand = qtyOnHand;
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    set qtyOnHand(value) {
        this._qtyOnHand = value;
    }
}
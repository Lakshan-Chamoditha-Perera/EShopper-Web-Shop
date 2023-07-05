import {customerList} from "../db/database.js";

export function save_customer(customer) {
    if(!customerList.some(c => c.id === customer.id)){
        customerList.push(customer);
        return true;
    }
    return false;
}

export function update_cutsomer(customer) {

}

export function view_customer(customer) {
}

export function delete_customer(customer) {
}

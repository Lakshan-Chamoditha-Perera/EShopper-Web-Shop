import {customerList} from "../db/database.js";

export function save_customer(customer) {
    if (!customerList.some(c => c.id === customer.id)) {
        customerList.push(customer);
        return true;
    }
    return false;
}

export function update_customer(customer) {
    let index = customerList.findIndex(c => c.id === customer.id);
    if (index === -1) {
        // Customer does not exist in the list
        return false;
    } else {
        // Customer exists in the list, update the customer details
        customerList[index].name = customer.name;
        customerList[index].address = customer.address;
        customerList[index].salary = customer.salary;
        return true;
    }
}

export function view_customer(customer) {
    let index = customerList.findIndex(c => c.id === customer.id)
    if (index!==-1) {
        // Customer exists in the list & return the customer
        return customerList[index];
    }
    // Customer does not exist in the list
    return null;
}

export function delete_customer(customer) {
    let index = customerList.findIndex(c => c.id === customer.id)
    if (index!==-1) {
        // Customer exists in the list & delete the customer
        customerList.splice(index, 1);
        return true;
    }
    // Customer does not exist in the list
    return false;
}

import {customerList} from "../db/database.js";

export function save_customer(customer) {
    if (!customerList.some(c => c.id === customer.id)) {
        customerList.push(customer);
        return true;
    }
    return false;
}

export function update_customer(customer) {
    var index = customerList.findIndex(c => c.id === customer.id);
    if (index === -1) {
        // Customer does not exist in the list
        return flase;
    } else {
        // Customer exists in the list, update the customer details
        customerList[index].name = customer.name;
        customerList[index].address = customer.address;
        customerList[index].salary = customer.salary;
        return true;
    }
}

export function view_customer(customer) {
}

export function delete_customer(customer) {
    var index = customerList.findIndex(c => c.id === customer.id)
    if (index!==-1) {
        customerList.splice(index, 1);
        return true;
    }
    return false;
}

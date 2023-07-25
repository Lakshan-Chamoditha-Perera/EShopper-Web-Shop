import {customerList} from "../db/database.js";

export function save_customer(customer) {
    // if (!customerList.some(c => c.id === customer.id)) {
    //     customerList.push(customer);
    //     return true;
    // }
    // return false;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/E_Shopper_API_war_exploded/customer");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("Response:",xhr.responseText);
            return true;
        } else {
            // console.error("Error:", xhr.status, xhr.statusText);
            return false;
        }
    };

    xhr.send(JSON.stringify(customer));
}

export function update_customer(customer) {
   /* let index = customerList.findIndex(c => c.id === customer.id);
    if (index === -1) {
        // Customer does not exist in the list
        return false;
    } else {
        // Customer exists in the list, update the customer details
        customerList[index].name = customer.name;
        customerList[index].address = customer.address;
        customerList[index].salary = customer.salary;
        return true;
    }*/
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:8080/E_Shopper_API_war_exploded/customer");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(true);
            } else {
                reject(new Error("Failed to update customer."));
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error occurred."));
        };
        xhr.send(JSON.stringify(customer));
    });
}

export function view_customer(customer) {
    let index = customerList.findIndex(c => c.id === customer.id)
    if (index !== -1) {
        // Customer exists in the list & return the customer
        return customerList[index];
    }
    // Customer does not exist in the list
    return null;
}
export function delete_customer(customer) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("DELETE", "http://localhost:8080/E_Shopper_API_war_exploded/customer");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Response:", "done");
                resolve(true);
            } else {
                reject(new Error("Failed to delete customer."));
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network error occurred."));
        };

        xhr.send(JSON.stringify(customer));
    });
}

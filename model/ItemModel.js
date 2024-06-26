import {itemList} from "../db/database.js";

export function save_item(item) {
    /* if (!itemList.some(i => i.code === item.code)) {
         itemList.push(item);
         return true;
     }
     return false;*/
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/E_Shopper_API_war_exploded/item");
        xhr.setRequestHeader("Content-Type", "application/json");
        console.log("Item Model: " + JSON.stringify(item))
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve = true;
            } else {
                reject(new Error("Failed to save item."));
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error occurred."));
        };
        xhr.send(JSON.stringify(item));
    })
}


export function update_item(item) {
    /*let index = itemList.findIndex(i => i.code === item.code);
    if (index === -1) {
        // item does not exist in the list
        return false;
    } else {
        // item exists in the list, update the item details
        itemList[index].description = item.description;
        itemList[index].price = item.price;
        itemList[index].qtyOnHand = item.qtyOnHand;
        return true;
    }*/
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:8080/E_Shopper_API_war_exploded/item");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(true);
            } else {
                reject(new Error("Failed to update item."));
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error occurred."));
        };
        xhr.send(JSON.stringify(item));
    });
}


export function delete_item(item) {
    /*let index = itemList.findIndex(i => i.code === item.code);
    if (index !== -1) {
        // item exists in the list & delete the item
        itemList.splice(index, 1);
        return true;
    }
    return false; // item does not exist in the list*/
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://localhost:8080/E_Shopper_API_war_exploded/item");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(true);
            } else {
                reject(new Error("Failed to save item"));
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network error occurred."));
        };
        xhr.send(JSON.stringify(item));
    });
}


export function view_item(item) {
    /*let index = itemList.findIndex(i => i.code === item.code);
    if (index !== -1) {
        // Item exists in the list & return the item
        return itemList[index];
    }
    // Item does not exist in the list
    return null;*/
    console.log("item model: "+JSON.stringify(item))
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:8080/E_Shopper_API_war_exploded/item?code=${item.code}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parse the JSON response to get the item data
                const itemData = JSON.parse(xhr.responseText);
                resolve(itemData);
            } else {
                reject(new Error("Item not found."));
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network error occurred."));
        };
        xhr.send();
    });
}
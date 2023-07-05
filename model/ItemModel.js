import {itemList} from "../db/database.js";

export function save_item(item) {
    if (!itemList.some(i => i.code === item.code)) {
        itemList.push(item);
        return true;
    }
    return false;
}


export function update_item(item) {
    let index = itemList.findIndex(i => i.code === item.code);
    if (index === -1) {
        // item does not exist in the list
        return false;
    } else {
        // item exists in the list, update the item details
        itemList[index].description = item.description;
        itemList[index].price = item.price;
        itemList[index].qtyOnHand = item.qtyOnHand;
        return true;
    }
}

import {itemList} from "../db/database.js";

export function save_item(item) {
    if (!itemList.some(i => i.code === item.code)) {
        itemList.push(item);
        return true;
    }
    return false;
}

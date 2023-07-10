import {ordersList} from "../db/database.js";
export function save_order(order) {
    if (!ordersList.some(o =>o.id === order.id)) {
        ordersList.push(ordersList);
        return true;
    }
    return false;
}

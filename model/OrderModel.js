export function save_order(order) {
    /*if (!ordersList.some(o =>o.id === order.id)) {
        ordersList.push(ordersList);
        return true;
    }
    return false;*/
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/E_Shopper_API_war_exploded/orders',
            contentType: 'application/json',
            async: true,
            data: JSON.stringify(order),
            success: () => {
                resolve(true);
            },
            error: (err) => {
                reject(err);
            }
        });
    });
}

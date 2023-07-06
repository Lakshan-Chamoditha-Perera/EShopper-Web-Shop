import {customerList, itemList} from "../db/database.js";

itemList.forEach(item=>{
    let option = document.createElement("option");
    option.value = JSON.stringify(item);
    option.text = item.description;
    document.getElementById('cmbItem').appendChild(option);
})


customerList.forEach(customer=>{
    let option = document.createElement("option");
    option.value = JSON.stringify(customer);
    option.text = customer.name;
    document.getElementById('cmbCustomers').appendChild(option);
});








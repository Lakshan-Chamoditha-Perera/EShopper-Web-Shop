import {customerList, itemList} from "../db/database.js";

itemList.forEach(item=>{
    let option = document.createElement("option");
    option.value = JSON.stringify(item);
    option.text = item.description;
    document.getElementById('cmbItem').appendChild(option);
})








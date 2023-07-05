import {Item} from "../dto/Item.js";
import {save_item, update_item} from "../model/ItemModel.js";
import {itemList} from "../db/database.js";


const item_code_regex = /^I(0[0-9]{2}|[1-9][0-9]{2}|9[0-8][0-9])$/;
const item_description_regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const item_price_regex = /^[0-9]+(?:\.[0-9]{1,2})?$/;
const item_qty_regex = /^-?\d+$/;


function item_validate() {
    if (item_code_regex.test($('#item_code').val())) {
        if (item_description_regex.test($('#item_description').val())) {
            if (item_price_regex.test($('#item_price').val())) {
                if (item_qty_regex.test($('#item_qty').val())) {
                    return true;
                } else {
                    alert('Error: Invalid qty input !');
                }
            } else {
                alert('Error: Invalid price input !');
            }
        } else {
            alert('Error: Invalid description input !');
        }
    } else {
        alert('Error: Invalid Item code input !');
    }
    return false;
}

let appendData = (item) => {
    let tableBody = document.getElementById("item_table_body");
    let row = document.createElement("tr");

    let codeCell = document.createElement("td");
    codeCell.textContent = item.code;
    codeCell.className = 'item-code';

    let descriptionCell = document.createElement("td");
    descriptionCell.textContent = item.description;
    descriptionCell.className = 'item-description';

    let priceCell = document.createElement("td");
    priceCell.textContent = item.price;
    priceCell.className = 'item-price';

    let qtyOnHandCell = document.createElement("td");
    qtyOnHandCell.textContent = item.qtyOnHand;
    qtyOnHandCell.className = 'item-qty';

    row.appendChild(codeCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(qtyOnHandCell);

    tableBody.appendChild(row);
}
/*save*/
const load = function loadTable() {
    let tableBody = document.getElementById("item_table_body");
    tableBody.innerHTML = "";
    itemList.forEach(item => appendData(item));
}
$('#item_save').on('click', (e) => {
    e.preventDefault();
    if (item_validate()) {
        let item = new Item($('#item_code').val(), $('#item_description').val(), $('#item_price').val(), $('#item_qty').val());
        let isSave = save_item(item);
        alert(isSave ? 'item saved' : 'item exists');
        load();
    }
});

/*update*/

$(document).ready(function () {
    $('#item_table_body').on('click', 'tr', function () {
        $('#item_code').val($(this).find('.item-code').text());
        $('#item_description').val($(this).find('.item-description').text());
        $('#item_price').val($(this).find('.item-price').text());
        $('#item_qty').val($(this).find('.item-qty').text());
    });
});
$('#item_update').on('click', (e) => {
    e.preventDefault();
    if (item_validate()) {
        let item = new Item($('#item_code').val(), $('#item_description').val(), $('#item_price').val(), $('#item_qty').val());
        let isUpdate = update_item(item);
        alert(isUpdate ? 'Item updated' : 'Item does not exist!');
        load();
    }
});

/*
 * created by Shan Perera
 * 5/7/2023
 */

import {Item} from "../dto/Item.js";
import {delete_item, save_item, update_item, view_item} from "../model/ItemModel.js";
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
const loadTable = function loadTable() {
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
        loadTable();
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
        loadTable();
    }
});

/*delete*/
$('#item_delete').on('click', (e) => {
    e.preventDefault();
    if (item_validate()) {
        let item = new Item();
        item.code = $('#item_code').val();
        let isUpdate = delete_item(item);
        alert(isUpdate ? 'Item deleted! ' : 'Item does not exist!');
        loadTable();
    }
});

/*search item*/
$('#search_item').on('keypress', function (event) {
    if (event.which === 13 && validateId()) {
        let item = new Item();
        item.code = $(this).val();
        item = view_item(item);
        if (item != null) {
            let tableBody = document.getElementById("item_table_body");
            tableBody.innerHTML = "";
            appendData(item);
        } else alert("Item record does not exist!")
    }
});

function validateId() {
    let flag = item_code_regex.test($('#search_item').val());
    if (!flag) alert('Error: Invalid item code!');
    return flag;
}

$('#clear_item').on('click', (e) => {
    e.preventDefault();
    loadTable();
});
loadTable();
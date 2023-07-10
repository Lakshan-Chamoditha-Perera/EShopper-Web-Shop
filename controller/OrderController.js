import {customerList, itemList} from "../db/database.js";
import {save_order} from "../model/OrderModel.js";

let btnAdd = document.getElementById("btn_addtocart");
itemList.forEach(item => {
    let option = document.createElement("option");
    option.value = JSON.stringify(item);
    option.text = item.code;
    document.getElementById('cmbItem').appendChild(option);
})
customerList.forEach(customer => {
    let option = document.createElement("option");
    option.value = JSON.stringify(customer);
    option.text = customer.id;
    document.getElementById('cmbCustomers').appendChild(option);
});
$('#cmbCustomers').on('change', function () {
    let selectedOption = this.options[this.selectedIndex];
    let selectedCustomer = JSON.parse(selectedOption.value);
    $('#customer_name').text(selectedCustomer.name);
});

$('#cmbItem').on('change', function () {
    let selectedOption = this.options[this.selectedIndex];
    let selectedItem = JSON.parse(selectedOption.value);
    $('#i_description').text(selectedItem.description);
    $('#i_price').text(selectedItem.price);
    $('#i_qtyOnHand').text(selectedItem.qtyOnHand);
});

function calculateTotal() {
    let tableBody = document.getElementById("cart_body");
    let rows = tableBody.getElementsByTagName("tr");
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let totalCell = row.querySelector(".order-item-total");
        let itemTotal = parseFloat(totalCell.textContent);
        total += itemTotal;
    }

    // Display the total sum in a separate element, if desired
    let totalSumElement = document.getElementById("total_price");
    if (totalSumElement) {
        totalSumElement.textContent = total.toFixed(2);
    }
}

function check(tableBody, item) {
    let rows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.getElementsByTagName("td");
        if (cells[0].textContent == item.code) return i;
    }
    return -1;
}

let addToCart = (quantity) => {
    let tableBody = document.getElementById("cart_body");
    const cmbItem = document.getElementById("cmbItem");
    const selectedOption = cmbItem.options[cmbItem.selectedIndex];
    let item = JSON.parse(selectedOption.value);
    item.qtyOnHand = parseFloat(quantity);
    let index = check(tableBody, item);
    if (index !== -1) {
        let rows = tableBody.getElementsByTagName("tr");
        let qtyOnHandCell = rows[index].querySelector(".order-item-qty");
        let totCell = rows[index].querySelector(".order-item-total");
        let currentQty = parseFloat(qtyOnHandCell.textContent);
        qtyOnHandCell.textContent = (currentQty + item.qtyOnHand).toFixed(2);
        totCell.textContent = parseFloat((qtyOnHandCell.textContent) * item.price).toFixed(2);
        calculateTotal();
        return;
    }

    let row = document.createElement("tr");
    let codeCell = document.createElement("td");

    codeCell.textContent = item.code;
    codeCell.className = 'order-item-code';

    let descriptionCell = document.createElement("td");
    descriptionCell.textContent = item.description;
    descriptionCell.className = 'order-item-description';

    let priceCell = document.createElement("td");
    priceCell.textContent = item.price;
    priceCell.className = 'order-item-price';

    let qtyOnHandCell = document.createElement("td");
    qtyOnHandCell.textContent = item.qtyOnHand;
    qtyOnHandCell.className = 'order-item-qty';

    let total = document.createElement("td");
    total.textContent = (item.qtyOnHand * item.price).toFixed(2);
    total.className = 'order-item-total';

    row.appendChild(codeCell);
    row.appendChild(descriptionCell);
    row.appendChild(qtyOnHandCell);
    row.appendChild(priceCell);
    row.appendChild(total);

    tableBody.appendChild(row);
    calculateTotal();
}

$('#btn_addtocart').on('click', () => {
    let quantity = $('#qty').val();
    let qtyOnHand = parseFloat($('#i_qtyOnHand').text());
    if (quantity != 0 && quantity != "" && quantity <= qtyOnHand) {
        addToCart(quantity);
    }
});

$('#qty').on('keyup', function () {
    let quantity = $(this).val();
    let qtyOnHand = parseFloat($('#i_qtyOnHand').text());
    if (quantity != 0 && quantity != "" && quantity <= qtyOnHand) {
        btnAdd.style.backgroundColor = '#3E64FF'
    } else {
        btnAdd.style.backgroundColor = '#EEEEEE'
        alert("Invalid quantity");
        this.value = '';
    }
});

function clearAll() {
    $('#txt_order_id').val('');
    $('#cmbCustomers').val('');
    $('#cmbItem').val('');
    $('#i_description').text('-');
    $('#i_price').text('-');
    $('#i_qtyOnHand').text('-');
    $('#total_price').text('0.00');
    $('#cart_body').empty();
}

$('#btn_place_order').on('click', () => {
    let cartItems = [];
    let rows = $('#cart_body tr');
    if ($('#txt_order_id').val() != null && JSON.parse($('#cmbCustomers').val()) != null && rows.length !== 0) {
        rows.each(function () {
            let cells = $(this).find('td');
            let item = {
                _code: cells.eq(0).text(),
                _description: cells.eq(1).text(),
                _qtyOnHand: parseInt(cells.eq(2).text()),
                _price: parseFloat(cells.eq(3).text())
            };
            cartItems.push(item);
        });
        let order = {
            _id: $('#txt_order_id').val(),
            _customer: JSON.parse($('#cmbCustomers').val()),
            _date: $('#date').text(),
            _total: parseFloat(document.getElementById('total_price').textContent),
            _itemList: cartItems
        };
        console.log(order)
        let flag = save_order(order);
        alert(flag ? "Order Placed! " : "Error: Something went wrong!");
    } else {
        alert("Oops something went wrong! Please check entered details");
    }
    clearAll();
});

import {Customer} from "../dto/Customer.js" ;
import {customerList} from "../db/database.js";
import {delete_customer, save_customer, update_customer, view_customer} from "../model/CustomerModel.js";

const customer_id_pattern = /^C(0[0-9]{2}|[1-9][0-9]{2}|9[0-8][0-9])$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const salary_pattern = /^[0-9]+(?:\.[0-9]{1,2})?$/;

const validate = function customer_validate() {
    if (customer_id_pattern.test($('#txt_customer_id').val())) {
        if (name_pattern.test($('#txt_customer_name').val())) {
            if (salary_pattern.test($('#txt_customer_salary').val())) {
                return true;
            } else {
                alert('Error: Invalid salary input !');
            }
        } else {
            alert('Error: Invalid name input !');
        }
    } else {
        alert('Error: Invalid Customer ID input !');
    }
    return false;
}
let appendData = (customer) => {
    let tableBody = document.getElementById("customer_table_body");

    let row = document.createElement("tr");
    // Create table cells for each customer property
    let idCell = document.createElement("td");
    idCell.textContent = customer.id;
    idCell.className = 'customer-id';

    let nameCell = document.createElement("td");
    nameCell.textContent = customer.name;
    nameCell.className = 'customer-name';

    let addressCell = document.createElement("td");
    addressCell.textContent = customer.address;
    addressCell.className = 'customer-address';

    let salaryCell = document.createElement("td");
    salaryCell.textContent = customer.salary;
    salaryCell.className = 'customer-salary';

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(salaryCell);

    tableBody.appendChild(row);
}
const load = function loadTable() {
    let tableBody = document.getElementById("customer_table_body");
    tableBody.innerHTML = "";
    customerList.forEach(customer => appendData(customer));
}

/*save*/
$('#btn_save_customer').on('click', (e) => {
    e.preventDefault();
    if (validate()) {
        let customer = new Customer($('#txt_customer_id').val(), $('#txt_customer_name').val(), $('#txt_customer_address').val(), $('#txt_customer_salary').val());
        let isSave = save_customer(customer);
        alert(isSave ? 'Customer saved' : 'Customer exists');
        load();
    }
});

/*update customer*/
$(document).ready(function () {
    $('#customer_tbl tbody').on('click', 'tr', function () {
        // extract the data from the clicked row
        let id = $(this).find('.customer-id').text();
        let name = $(this).find('.customer-name').text();
        let email = $(this).find('.customer-address').text();
        let salary = $(this).find('.customer-salary').text();

        // customer object using the extracted data
        let customer = new Customer(id, name, email, parseFloat(salary));
        $('#txt_customer_id').val(customer.id);
        $('#txt_customer_name').val(customer.name);
        $('#txt_customer_address').val(customer.address);
        $('#txt_customer_salary').val(customer.salary);

    });
});
$('#btn_update_customer').on('click', (e) => {
    e.preventDefault();
    if (validate()) {
        let customer = new Customer($('#txt_customer_id').val(), $('#txt_customer_name').val(), $('#txt_customer_address').val(), $('#txt_customer_salary').val());
        let isUpdate = update_customer(customer);
        alert(isUpdate ? 'Customer updated' : 'Customer not exists!');
        load();
    }
});

/*delete customer*/
$('#btn_delete_customer').on('click', (e) => {
    e.preventDefault();
    if (validate()) {
        let customer = new Customer();
        customer.id = $('#txt_customer_id').val();
        let isUpdate = delete_customer(customer);
        alert(isUpdate ? 'Customer deleted! ' : 'Customer not exists!');
        load();
    }
});

/*search customer*/
$('#search_customer').on('keypress', function (event) {
    if (event.which === 13 && validateId()) {
        let customer = new Customer();
        customer.id = $(this).val();
        customer = view_customer(customer);
        if (customer != null) {
            let tableBody = document.getElementById("customer_table_body");
            tableBody.innerHTML = "";
            appendData(customer);
        } else alert("Customer record does not exists!")
    }
});

function validateId() {
    let flag = customer_id_pattern.test($('#search_customer').val());
    if (!flag) alert('Error: Invalid customer ID!');
    return flag;
}

$('#clear_customer').on('click',(e) => {
    e.preventDefault();
    load();
});

load();
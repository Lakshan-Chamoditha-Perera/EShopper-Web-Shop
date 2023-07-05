import {Customer} from "../dto/Customer.js" ;
import {customerList} from "../db/database.js";
import {save_customer} from "../model/CustomerModel.js";

const customer_id_pattern = /^C(0[0-9]{2}|[1-9][0-9]{2}|9[0-8][0-9])$/;
const name_pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
const salary_pattern = /^[0-9]+(?:\.[0-9]{1,2})?$/;

let validate = function customer_validate() {
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
let load = function loadTable() {
    let tableBody = document.getElementById("customer_table_body");
    tableBody.innerHTML = "";
    customerList.forEach(function (customer) {
        let row = document.createElement("tr");

        // Create table cells for each customer property
        let idCell = document.createElement("td");
        idCell.textContent = customer.id;
        let nameCell = document.createElement("td");
        nameCell.textContent = customer.name;
        let addressCell = document.createElement("td");
        addressCell.textContent = customer.address;
        let salaryCell = document.createElement("td");
        salaryCell.textContent = customer.salary;
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(addressCell);
        row.appendChild(salaryCell);
        tableBody.appendChild(row);
    });
}
$('#btn_save_customer').click((e) => {
    e.preventDefault();
    if (validate()) {
        let customer = new Customer($('#txt_customer_id').val(), $('#txt_customer_name').val(), $('#txt_customer_address').val(), $('#txt_customer_salary').val());
        let isSave = save_customer(customer);
        alert(isSave ? 'Customer saved' : 'Customer exists');
        load();
    }
});
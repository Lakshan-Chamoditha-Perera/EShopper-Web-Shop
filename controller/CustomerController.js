
import {Customer}   from "../model/Customer.js" ;

navigate('home');

let form = document.getElementById('customer_form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let cust = new Customer('shan','shan','shan',12000);
    console.log(cust)
    form.reset();
})
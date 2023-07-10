# EShopper Web Shop
EShopper is a single-page application for managing customers, items, and orders in an online shop, following the MVC (Model-View-Controller) architecture.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description
EShopper is a web-based application that implements the MVC architecture to provide a structured and organized approach to managing customers, items, and orders in an online shop. 
The MVC pattern separates the application into three interconnected components:
  
  - Model: Represents the data and business logic of the application. It encapsulates the data structures, database operations, and business rules. 
  In EShopper, the models handle customer, item, and order-related data and functionalities.
  - View: Represents the user interface of the application. It is responsible for displaying the data to the user and handling user interactions. 
EShopper uses HTML, CSS, and JavaScript/jQuery to create interactive and responsive views for managing customers, items, and orders.
  - Controller: Acts as an intermediary between the model and the view. It handles user inputs, updates the model accordingly, and updates the view to reflect the changes. 

EShopper uses JavaScript/jQuery controllers to handle user actions, update the models, and manipulate the views.
By following the MVC architecture, EShopper ensures the separation of concerns, modularity, and maintainability of the codebase. 
It promotes code reusability, scalability, and ease of testing.

## Features
EShopper provides the following features:

- Manage customer information: Add, update, and delete customer details such as ID, name, address, and salary.
- Manage item information: Add, update, and delete item details such as code, description, price, and quantity on hand.
- Place orders: Create new orders by selecting customers, adding items to the cart, and specifying quantities.
- Calculate total: Automatically calculate the total price of the items in the order.
- Clear functionality: Clear the form and reset the application for entering a new order.

## Technologies Used

EShopper utilizes the following technologies:

- HTML
- CSS
- JavaScript
- jQuery
- Bootstrap

## Installation

- Clone the repository: git clone https://github.com/your-username/EShopper-Web-Shop.git
- Open the project directory: cd EShopper-Web-Shop
- Open the index.html file in your web browser.

## ID Patterns
EShopper enforces specific patterns for customer and item IDs using regular expressions. The following patterns are used:
- Customer ID Pattern: **Sample Data: C001, C123, C999**
- Item Code Pattern: **Sample Data: I001, I123, I999**

## Usage
- On the main page, navigate the different sections using the navigation menu.
- Manage Customers: Add, update, or delete customer information using the form. Search for customers by ID.
- Manage Items: Add, update, or delete item information using the form. Search for items by code.
- Place Order: Enter the order ID, select a customer from the dropdown list, and add items to the cart.
- View Cart: See the items added to the cart, including the item code, description, quantity, price, and total.
- Calculate Total: The application automatically calculates the total price of the items in the cart.
- Place Order: Click the "Place Order" button to finalize the order. The order details, including the order ID, customer, date, total, and item list, will be displayed in the console.
- Clear All: Click the "Clear All" button to clear the form and reset the application for entering a new order.

## Contributing
Contributions to the EShopper Web Shop project are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

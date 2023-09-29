
![Yellow_E-commerce_Shop_Bag_Store_Logo__2_-removebg-preview](https://github.com/SimoneAiello97/Capstone/assets/126870680/3e1cbcd9-a2d5-44ce-8251-8028104efd99)
# E-Store 

This is a full-stack E-commerce application that includes both an admin dashboard and a customer storefront. It also features user registration with email validation.

## Features

### Security 
Email Verification: Verify user email addresses. <br>
Role-Based Access Control: Admin and user roles with restricted access. <br>

### Customer Storefront

Product Catalog: Browse a wide range of products. <br>
Product Search: Search for products using keywords. <br>
Product Filtering: Filter products by price or category. <br>
Product Details: View detailed information about a product. <br>
Shopping Cart: Add and manage items in the shopping cart. <br>
Checkout: Place orders and make payments with STRIPE. <br>
Order History: View past orders. <br>

### Admin Dashboard
Product Management: Add, edit, and delete products. <br>
Category Management: Manage product categories. <br>
User Management: View and manage user accounts. <br>
Order Management: View and manage customer orders. <br>

## Technologies Used
### Frontend:

![Static Badge](https://img.shields.io/badge/Angular-darkred?logo=angular) 
![Static Badge](https://img.shields.io/badge/HTML-darkorange?logo=html5)
![Static Badge](https://img.shields.io/badge/CSS-darkblue?logo=css3)
![Static Badge](https://img.shields.io/badge/JavaScript-yellow?logo=javascript)
![Static Badge](https://img.shields.io/badge/TypeScript-lightblue?logo=typescript)
![Static Badge](https://img.shields.io/badge/Three.js-grey?logo=threedotjs)

Chart.js <br>
PrimeNg for UI components <br>
Bootstrap for user-friendly experience responsive <br>

### Backend:

Spring Boot (Java) <br>
Spring Security for authentication and authorization <br>
Spring Data JPA for data access <br>
RESTful API endpoints <br>
SpringMail for sending verification emails <br>
Verification token generation and validation <br>

### Database:

PostgreSQL

## Setup:
### Front-end Setup
Navigate to the frontend directory.  <br>
Run ![Static Badge](https://img.shields.io/badge/npm_install-lightgrey?logo=npm)
to install frontend dependencies.  <br>
Configure the API endpoint URL in the frontend code.  <br>
Run ng serve to start the frontend development server.  <br>

### Backend Setup:

Navigate to the backend directory.  <br>
Set up a PostgreSQL database and configure the database connection in application.properties.  <br>
Configure email service credentials in application.properties.  <br>
Run the Spring Boot application.  <br>

### Access the application:

Frontend: Open a web browser and navigate to http://localhost:4200 (or the configured port).  <br>
Backend: The API endpoints are available at http://localhost:8080 (or the configured port).  <br>

## Usage 

### Customer 
Browse products, add them to the cart, and place orders. Verify your email address after registration.

### Admin
Log in with admin credentials (username:admin, password:admin) to access the admin dashboard. Manage products, categories, users, and orders.


# Contributors
## Simone Aiello



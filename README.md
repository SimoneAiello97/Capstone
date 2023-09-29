
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

Angular <br>
HTML/CSS <br>
JavaScript <br>
TypeScript <br>
PrimeNg for UI components <br>
Bootstrap for user-friendly experience responsive <br>


### Backend:

Spring Boot (Java)
Spring Security for authentication and authorization
Spring Data JPA for data access
RESTful API endpoints
Database:

PostgreSQL
Email Verification:

SendGrid or other email service for sending verification emails
Verification token generation and validation
Setup
Clone this repository.

Frontend Setup:

Navigate to the frontend directory.
Run npm install to install frontend dependencies.
Configure the API endpoint URL in the frontend code.
Run ng serve to start the frontend development server.
Backend Setup:

Navigate to the backend directory.
Set up a PostgreSQL database and configure the database connection in application.properties.
Configure email service credentials in application.properties.
Run the Spring Boot application.
Access the application:

Frontend: Open a web browser and navigate to http://localhost:4200 (or the configured port).
Backend: The API endpoints are available at http://localhost:8080 (or the configured port).
Usage
Customer: Browse products, add them to the cart, and place orders. Verify your email address after registration.

Admin: Log in with admin credentials to access the admin dashboard. Manage products, categories, users, and orders.

Deployment
Frontend: Deploy the Angular app to a web hosting service or a cloud platform like AWS, Netlify, or Vercel.

Backend: Deploy the Spring Boot application to a cloud platform like AWS, Heroku, or Azure. Configure a production-ready database and email service.

Contributors
[Your Name] - [Your Email]
License
This project is licensed under the [License Name] License - see the LICENSE.md file for details.

Acknowledgments
Mention any libraries, frameworks, or tools used that deserve acknowledgement.
Inspiration, if any, for your project.
Any other relevant information or credits.

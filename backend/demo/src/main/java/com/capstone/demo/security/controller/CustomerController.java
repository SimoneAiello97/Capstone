package com.capstone.demo.security.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.demo.security.entity.Category;
import com.capstone.demo.security.entity.Order;
import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.entity.ShoppingCart;
import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.service.CategoryService;
import com.capstone.demo.security.service.OrderServiceImpl;
import com.capstone.demo.security.service.ProductServiceImpl;
import com.capstone.demo.security.service.ShoppingCartServiceImpl;
import com.capstone.demo.security.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private ShoppingCartServiceImpl cartService;

    @Autowired
    private OrderServiceImpl orderService;

    @GetMapping("/products/highPrice")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<List<Product>> filterHighPrice(){
        List<Product> productDtoList = productService.filterHighPrice();
        ResponseEntity<List<Product>> resp = new ResponseEntity<List<Product>>(productDtoList, HttpStatus.OK);
       return resp;
    }

    @GetMapping("/products/lowPrice")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<List<Product>> filterLowerPrice(){
        List<Product> productDtoList = productService.filterLowPrice();
        ResponseEntity<List<Product>> resp = new ResponseEntity<List<Product>>(productDtoList, HttpStatus.OK);
       return resp;
    }

    @GetMapping("/products/inCategory/{id}")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<List<Product>> findProductByCategory(@PathVariable("id") Long id){
        List<Product> productDtoList = productService.getProductsInCategory(id);
        ResponseEntity<List<Product>> resp = new ResponseEntity<List<Product>>(productDtoList, HttpStatus.OK);
       return resp;
    }

    @GetMapping("/products/related/{id}")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<List<Product>> findRelateProduct(@PathVariable("id") Long id){
        List<Product> productDtoList = productService.getRelatedProducts(id);
        ResponseEntity<List<Product>> resp = new ResponseEntity<List<Product>>(productDtoList, HttpStatus.OK);
       return resp;
    }

    @GetMapping("/cart")
    @PreAuthorize("hasRole('USER')")
public ResponseEntity<ShoppingCart> cart() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();;
    User customer = userService.getByEmail(email);
    ShoppingCart shoppingCart = customer.getShoppingCart();
    System.out.println(shoppingCart + " --> Cart dell'utente");

    ResponseEntity<ShoppingCart> resp =new ResponseEntity<ShoppingCart>(shoppingCart, HttpStatus.OK);
        return resp;
   
}

 @PostMapping("/addToCart/{id}")
 @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ShoppingCart> addItemToCart(
            @PathVariable("id")  Long productId,
            @RequestParam(value = "quantity", required = false, defaultValue = "1") int quantity
           ){

       
        Product product = productService.getById(productId);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();;
        User customer = userService.getByEmail(email);

        ShoppingCart cart = cartService.addItemToCart(product, quantity, customer);
         ResponseEntity<ShoppingCart> resp =new ResponseEntity<ShoppingCart>(cart, HttpStatus.OK);
        return resp;
    }

@PutMapping("/updateCart/{id}/{quantity}")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<ShoppingCart> updateCart(
        @PathVariable("id") Long productId,
        @PathVariable("quantity") int quantity
) {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User customer = userService.getByEmail(email);
    Product product = productService.getById(productId);
    
    ShoppingCart cart = cartService.updateItemInCart(product, quantity, customer);

    ResponseEntity<ShoppingCart> resp = new ResponseEntity<>(cart, HttpStatus.OK);
    return resp;
}

@DeleteMapping("/deleteFromCart/{id}")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<ShoppingCart> deleteItemFromCart(
        @PathVariable("id") Long productId
) {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User customer = userService.getByEmail(email);
    Product product = productService.getById(productId);

    ShoppingCart cart = cartService.deleteItemFromCart(product, customer);

    ResponseEntity<ShoppingCart> resp = new ResponseEntity<>(cart, HttpStatus.OK);
    return resp;
}

@GetMapping("/allOrders")
public ResponseEntity<List<Order>> getAllOrders(){
    
    List<Order> orderList = orderService.findALlOrders();

    ResponseEntity<List<Order>> resp = new ResponseEntity<List<Order>>(orderList, HttpStatus.OK);
    return resp;
}

@GetMapping("/allOrdersCustomer")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<List<Order>> getAllOrdersCustomer(){
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User customer = userService.getByEmail(email);
    List<Order> orderList = customer.getOrders();

    ResponseEntity<List<Order>> resp = new ResponseEntity<List<Order>>(orderList, HttpStatus.OK);
    return resp;
}

@PostMapping("/addOrder")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<Order> addOrder(){
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User customer = userService.getByEmail(email);
    ShoppingCart cart = customer.getShoppingCart();
    Order order = orderService.save(cart);
     ResponseEntity<Order> resp = new ResponseEntity<Order>(order, HttpStatus.OK);
    return resp;
}

@GetMapping("/singleUser")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<User> getSingleCustomer(){
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User customer = userService.getByEmail(email);
    ResponseEntity<User> resp = new ResponseEntity<User>(customer, HttpStatus.OK);
    return resp;
}

}
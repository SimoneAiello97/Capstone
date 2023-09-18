package com.capstone.demo.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.service.ProductServiceImpl;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    @Autowired
    private ProductServiceImpl productService;

    @GetMapping("/products")
    //@PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<Page<Product>> getAllProducts(Pageable page){
        Page<Product> productDtoList = productService.getAllPage(page);
        ResponseEntity<Page<Product>> resp = new ResponseEntity<Page<Product>>(productDtoList, HttpStatus.OK);
       return resp;
    }
}

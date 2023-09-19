package com.capstone.demo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.demo.security.entity.Category;
import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.service.CategoryService;
import com.capstone.demo.security.service.ProductServiceImpl;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private CategoryService categoryService;

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
}

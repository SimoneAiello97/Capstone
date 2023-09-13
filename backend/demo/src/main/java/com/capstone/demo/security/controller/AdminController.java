package com.capstone.demo.security.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.capstone.demo.security.dto.ProductDto;
import com.capstone.demo.security.entity.Category;
import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.entity.User;

import com.capstone.demo.security.service.CategoryServiceImpl;

import com.capstone.demo.security.service.ProductServiceImpl;
import com.capstone.demo.security.service.UserService;



@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    @Autowired UserService userSvc;

    @Autowired
    private ProductServiceImpl productService;
    
    @GetMapping("/users")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
		Page<User> ls = userSvc.getUsersPagination(pageable);
		ResponseEntity<Page<User>> resp = new ResponseEntity<Page<User>>(ls, HttpStatus.OK);
		return resp;
	}

	@Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/categories")
	@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Category>> getAllcategories(){
        List<Category> categories = categoryService.findAll();
       ResponseEntity<List<Category>> resp = new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
       return resp;
    }

    @PostMapping("/categories/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category c = categoryService.addCategory(category);
       ResponseEntity<Category> resp = new ResponseEntity<Category>(c, HttpStatus.OK);
       return resp;
    }

    @DeleteMapping("/categories/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
		Category c = categoryService.findById(id);
        categoryService.deleteById(id);
		return  new ResponseEntity<Category>(c, HttpStatus.OK);
	}

    @PutMapping("categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<Category> toggleCategory(@PathVariable Long id, @RequestBody Category category) {
       category = categoryService.findById(id);
        if(category.is_activated()){
            categoryService.disableById(id);
        }
        else{
            categoryService.enabledById(id);
        }        
        categoryService.update(category);
        return new ResponseEntity<Category>(category, HttpStatus.OK);
    }

    

    @GetMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<List<ProductDto>> getAllProducts(){
        List<ProductDto> productDtoList = productService.findAll();
        ResponseEntity<List<ProductDto>> resp = new ResponseEntity<List<ProductDto>>(productDtoList, HttpStatus.OK);
       return resp;
    }
    
    @PostMapping("/products/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addProduct(@RequestBody Product product){
        Product p = productService.addProduct(product);
       ResponseEntity<Product> resp = new ResponseEntity<Product>(p, HttpStatus.OK);
       return resp;
    }

}

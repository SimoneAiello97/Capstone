package com.capstone.demo.security.controller;

import java.security.Principal;
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
import org.springframework.web.bind.annotation.RequestParam;
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
    @Autowired
    UserService userSvc;

    @Autowired
    private ProductServiceImpl productService;
    
    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        // Ottieni tutti gli utenti e restituiscili come ResponseEntity
        List<User> ls = userSvc.getAllUsers();
        ResponseEntity<List<User>> resp = new ResponseEntity<List<User>>(ls, HttpStatus.OK);
        return resp;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllcategories() {
        // Ottieni tutte le categorie e restituiscile come ResponseEntity
        List<Category> categories = categoryService.findAll();
        ResponseEntity<List<Category>> resp = new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
        return resp;
    }

    @PostMapping("/categories/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        // Aggiungi una nuova categoria e restituisci la categoria aggiunta come ResponseEntity
        Category c = categoryService.addCategory(category);
        ResponseEntity<Category> resp = new ResponseEntity<Category>(c, HttpStatus.OK);
        return resp;
    }

    // LA DELETE NON MI SERVE IN QUANTO SI COLLEGA AI VARI PRODOTTI
    /*
     * @DeleteMapping("/categories/{id}")
     * 
     * @PreAuthorize("hasRole('ADMIN')")
     * public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
     * Category c = categoryService.findById(id);
     * categoryService.deleteById(id);
     * return new ResponseEntity<Category>(c, HttpStatus.OK);
     * }
     */

    @PutMapping("categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> toggleCategory(@PathVariable Long id, @RequestBody Category category) {
         // Trova una categoria per ID e attivala o disattivala
        category = categoryService.findById(id);
        if (category.is_activated()) {
            categoryService.disableById(id);
        } else {
            categoryService.enabledById(id);
        }
        categoryService.update(category);
        return new ResponseEntity<Category>(category, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getAllProducts(Pageable page) {
        // Ottieni tutti i prodotti paginati e restituiscili come ResponseEntity
        Page<Product> productDtoList = productService.getAllPage(page);
        ResponseEntity<Page<Product>> resp = new ResponseEntity<Page<Product>>(productDtoList, HttpStatus.OK);
        return resp;
    }

    @GetMapping("/products/search-result/{pageNo}")
    public ResponseEntity<Page<ProductDto>> searchProducts(@PathVariable("pageNo") int pageNo,
                                                            @RequestParam("keyword") String keyword,
                                                                                Principal principal) {
        // Aggiungi un nuovo prodotto e restituisci il prodotto aggiunto come ResponseEntity
        // Gestisci anche la creazione di una nuova categoria se non esiste
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Page<ProductDto> products = productService.searchProducts(pageNo, keyword);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        // Ottieni il prodotto dal servizio utilizzando l'ID fornito
        Product product = productService.getById(productId);
    
        // Verifica se il prodotto è stato trovato
        if (product == null) {
            // Se il prodotto non è stato trovato, restituisci una risposta con stato "NOT_FOUND"
            return new ResponseEntity<>("Prodotto non trovato", HttpStatus.NOT_FOUND);
        }
    
        // Se il prodotto è stato trovato, restituisci il prodotto come parte della risposta con stato "OK"
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/products/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addProduct(@RequestBody Product productRequest) {
        // Verifica se esiste già una categoria con lo stesso nome
        Category category = categoryService.findByName(productRequest.getCategory().getName());

        // Se la categoria non esiste, crea una nuova categoria
        if (category == null) {
            category = new Category(productRequest.getCategory().getName());
            categoryService.addCategory(category);
        }

        // Crea il nuovo prodotto e associatelo alla categoria trovata o creata
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setCostPrice(productRequest.getCostPrice());
        product.setSalePrice(productRequest.getSalePrice());
        product.setCurrentQuantity(productRequest.getCurrentQuantity());
        product.setImage(productRequest.getImage());
        product.setCategory(category);

        Product newProduct = productService.addProduct(product);

        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("products/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long productId,
            @RequestBody Product productRequest) {

        // Verifica se il prodotto esiste
        Product existingProduct = productService.getById(productId);
        if (existingProduct == null) {
            return new ResponseEntity<>("Prodotto non trovato", HttpStatus.NOT_FOUND);
        }

        // Verifica se esiste già una categoria con lo stesso nome
        Category category = categoryService.findByName(productRequest.getCategory().getName());

        // Se la categoria non esiste, crea una nuova categoria
        if (category == null) {
            category = new Category(productRequest.getCategory().getName());
            categoryService.addCategory(category);
        }

        // Aggiorna le informazioni del prodotto
        existingProduct.setName(productRequest.getName());
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setCostPrice(productRequest.getCostPrice());
        existingProduct.setSalePrice(productRequest.getSalePrice());
        existingProduct.setCurrentQuantity(productRequest.getCurrentQuantity());
        existingProduct.setImage(productRequest.getImage());
        existingProduct.setCategory(category);

        Product updatedProduct = productService.save(existingProduct);

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/products/{productId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        // Trova e elimina un prodotto per ID e restituiscilo come ResponseEntity
        Product existingProduct = productService.getById(productId);
        productService.deleteById(productId);

        return new ResponseEntity<>(existingProduct, HttpStatus.OK);
    }
}

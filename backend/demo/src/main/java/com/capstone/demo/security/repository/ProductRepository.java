package com.capstone.demo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.demo.security.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select p from Product p where p.description ilike %?1% or p.name ilike %?1%")
    List<Product> searchProductsList(String keyword);

    @Query(value = "SELECT p.* FROM products p INNER JOIN categories c ON c.category_id = p.category_id WHERE p.category_id = ?1", nativeQuery = true)
    List<Product> getRelatedProducts(Long categoryId);


    @Query(value = "select p from Product p inner join Category c on c.id = p.category.id where c.id = ?1")
    List<Product> getProductsInCategory(Long categoryId);
    
    @Query("select p from Product p order by p.salePrice desc")
    List<Product> filterHighPrice();

    @Query("select p from Product p order by p.salePrice ")
    List<Product> filterLowPrice();
}

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
    
}

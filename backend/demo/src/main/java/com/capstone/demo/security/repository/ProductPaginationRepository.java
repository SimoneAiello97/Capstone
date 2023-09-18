package com.capstone.demo.security.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.capstone.demo.security.entity.Product;

public interface ProductPaginationRepository extends PagingAndSortingRepository<Product, Long> {
    
}

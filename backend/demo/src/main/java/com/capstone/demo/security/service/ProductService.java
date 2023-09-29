package com.capstone.demo.security.service;


import java.util.List;

import org.springframework.data.domain.Page;
import com.capstone.demo.security.dto.ProductDto;
import com.capstone.demo.security.entity.Product;

public interface ProductService {
    List<ProductDto> findAll();
    Product save(Product product);
    void deleteById(Long id);
    void enableById(Long id);
    Product getById(Long id);
     Page<ProductDto> searchProducts(int pageNo, String keyword);
}

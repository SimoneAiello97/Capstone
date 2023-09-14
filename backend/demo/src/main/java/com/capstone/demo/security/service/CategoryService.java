package com.capstone.demo.security.service;



import java.util.List;

import com.capstone.demo.security.dto.CategoryDto;
import com.capstone.demo.security.entity.Category;

public interface CategoryService {

    List<Category> findAll();
    Category save(Category category);
    Category findById(Long id);
    Category update(Category category);
    void deleteById(Long id);
    void enabledById(Long id);
    List<Category> findAllByActivated();

    Category findByName(String name);

}

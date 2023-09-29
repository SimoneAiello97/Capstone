package com.capstone.demo.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.capstone.demo.security.entity.Category;
import com.capstone.demo.security.exception.MyAPIException;
import com.capstone.demo.security.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository repo;

    @Override
    public List<Category> findAll() {
        return repo.findAll();
    }

    @Override
    public Category save(Category category) {
        Category categorySave = new Category(category.getName());
        return repo.save(categorySave);
    }

    @Override
    public Category findById(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public Category update(Category category) {
        Category categoryUpdate = null;
        try {
            categoryUpdate= repo.findById(category.getId()).get();
            categoryUpdate.setName(category.getName());
            categoryUpdate.set_activated(category.is_activated());
            categoryUpdate.set_deleted(category.is_deleted());
        }catch (Exception e){
            e.printStackTrace();
        }
        return repo.save(categoryUpdate);
    }

    @Override
    public void deleteById(Long id) {
        if (repo.existsById(id)) {
			repo.deleteById(id);			
		}
		else {
			throw new MyAPIException(HttpStatus.BAD_REQUEST, "Cancellazione errata, Categoria non trovato!");			
		}
    }

    @Override
    public void enabledById(Long id) {
        Category category = repo.getById(id);
        category.set_activated(true);
        category.set_deleted(false);
        repo.save(category);
    }

    @Override
    public List<Category> findAllByActivated() {
        return repo.findAllByActivated();
    }

   public Category addCategory(Category category) {
    Category c = new Category(category.getName());
    repo.save(c);
    return c;
   }

   public Category disableById(Long id) {
    Category category = repo.findById(id).get();
    category.set_deleted(true);
    category.set_activated(false);
    return repo.save(category);
}

@Override
public Category findByName(String name) {
   return repo.findByName(name);
}
}

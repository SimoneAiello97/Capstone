package com.capstone.demo.security.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.demo.security.dto.ProductDto;
import com.capstone.demo.security.entity.Category;
import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.repository.ProductRepository;
import com.capstone.demo.security.util.ImageUpload;

@Service
public class ProductServiceImpl implements ProductService {

     @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUpload imageUpload;

    @Override
    public List<ProductDto> findAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtoList = transfer(products);
        return productDtoList;
    }

    @Override
    public Product save(MultipartFile imageProduct, ProductDto productDto) {
        try {
            Product product = new Product();
            if(imageProduct == null){
                product.setImage(null);
            }else{
                if(imageUpload.uploadImage(imageProduct)){
                    System.out.println("Upload successfully");
                }
                product.setImage(Base64.getEncoder().encodeToString(imageProduct.getBytes()));
            }
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setCategory(productDto.getCategory());
            product.setCostPrice(productDto.getCostPrice());
            product.setCurrentQuantity(productDto.getCurrentQuantity());
            product.set_activated(true);
            product.set_deleted(false);
            return productRepository.save(product);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Product update(MultipartFile imageProduct, ProductDto productDto) {
        try {
            Product product = productRepository.getById(productDto.getId());
            if(imageProduct == null){
                product.setImage(product.getImage());
            }else{
                if(imageUpload.checkExisted(imageProduct) == false){
                    imageUpload.uploadImage(imageProduct);
                }
                product.setImage(Base64.getEncoder().encodeToString(imageProduct.getBytes()));
            }
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setSalePrice(productDto.getSalePrice());
            product.setCostPrice(productDto.getCostPrice());
            product.setCurrentQuantity(productDto.getCurrentQuantity());
            product.setCategory(productDto.getCategory());
            return productRepository.save(product);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void deleteById(Long id) {
        Product product = productRepository.getById(id);
        product.set_deleted(true);
        product.set_activated(false);
        productRepository.save(product);
    }

    @Override
    public void enableById(Long id) {
        Product product = productRepository.getById(id);
        product.set_activated(true);
        product.set_deleted(false);
        productRepository.save(product);
    }

    @Override
    public ProductDto getById(Long id) {
        Product product = productRepository.getById(id);
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setCurrentQuantity(product.getCurrentQuantity());
        productDto.setCategory(product.getCategory());
        productDto.setSalePrice(product.getSalePrice());
        productDto.setCostPrice(product.getCostPrice());
        productDto.setImage(product.getImage());
        productDto.setDeleted(product.is_deleted());
        productDto.setActivated(product.is_activated());
        return productDto;
    }
    

     private List<ProductDto> transfer(List<Product> products){
        List<ProductDto> productDtoList = new ArrayList<>();
        for(Product product : products){
            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setName(product.getName());
            productDto.setDescription(product.getDescription());
            productDto.setCurrentQuantity(product.getCurrentQuantity());
            productDto.setCategory(product.getCategory());
            productDto.setSalePrice(product.getSalePrice());
            productDto.setCostPrice(product.getCostPrice());
            productDto.setImage(product.getImage());
            productDto.setDeleted(product.is_deleted());
            productDto.setActivated(product.is_activated());
            productDtoList.add(productDto);
        }
        return productDtoList;
    }

	public Product addProduct(Product product) {
		Product p = new Product(product.getId(),
         product.getName(), 
         product.getDescription(),
         product.getCostPrice(),
          product.getSalePrice(), 
          product.getCurrentQuantity(), 
          product.getImage(),
           product.getCategory(),
            false,
             true);
    productRepository.save(p);
    return p;
	}

    
}

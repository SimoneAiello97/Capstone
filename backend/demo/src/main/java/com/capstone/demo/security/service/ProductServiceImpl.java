package com.capstone.demo.security.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.demo.security.dto.ProductDto;
import com.capstone.demo.security.entity.Category;
import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.repository.ProductPaginationRepository;
import com.capstone.demo.security.repository.ProductRepository;
import com.capstone.demo.security.util.ImageUpload;

@Service
public class ProductServiceImpl implements ProductService {

     @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPaginationRepository productPageRepo;

    @Override
    public List<ProductDto> findAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtoList = transfer(products);
        return productDtoList;
    }

    public Page<Product> getAllPage(Pageable page){
        return productPageRepo.findAll(page);
    }


    @Override
    public void deleteById(Long id) {
        Product product = productRepository.getById(id);
        product.setCategory(null);
        productRepository.save(product);
            productRepository.delete(product);
    }

    @Override
    public void enableById(Long id) {
        Product product = productRepository.getById(id);
        product.set_activated(true);
        product.set_deleted(false);
        productRepository.save(product);
    }

    @Override
        public Product getById(Long id) {
    Optional<Product> optionalProduct = productRepository.findById(id);
    return optionalProduct.orElse(null); // Restituisce il prodotto o null se non esiste.
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

	public Product save(Product existingProduct) {
		return productRepository.save(existingProduct);
	}

    @Override
    public Page<ProductDto> searchProducts(int pageNo, String keyword) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        List<ProductDto> productDtoList = transfer(productRepository.searchProductsList(keyword));
        Page<ProductDto> products = toPage(productDtoList, pageable);
        return products;
    }

     private Page toPage(List<ProductDto> list , Pageable pageable){
        if(pageable.getOffset() >= list.size()){
            return Page.empty();
        }
        int startIndex = (int) pageable.getOffset();
        int endIndex = ((pageable.getOffset() + pageable.getPageSize()) > list.size())
                ? list.size()
                : (int) (pageable.getOffset() + pageable.getPageSize());
        List subList = list.subList(startIndex, endIndex);
        return new PageImpl(subList, pageable, list.size());
    }



    
}

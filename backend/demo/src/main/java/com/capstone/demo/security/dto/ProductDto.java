package com.capstone.demo.security.dto;

import com.capstone.demo.security.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private double costPrice;
    private double salePrice;
    private int currentQuantity;
    private Category category;
    private String image;
    private boolean activated;
    private boolean deleted;
}

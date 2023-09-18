package com.capstone.demo.security.service;

import com.capstone.demo.security.entity.Product;
import com.capstone.demo.security.entity.ShoppingCart;
import com.capstone.demo.security.entity.User;

public interface ShoppingCartService {
    
     ShoppingCart addItemToCart(Product product, int quantity, User customer);

    ShoppingCart updateItemInCart(Product product, int quantity, User customer);

    ShoppingCart deleteItemFromCart(Product product, User customer);
}

package com.capstone.demo.security.service;

import java.util.List;

import com.capstone.demo.security.entity.Order;
import com.capstone.demo.security.entity.ShoppingCart;

public interface OrderService {
    Order save(ShoppingCart shoppingCart);

    List<Order> findAll(String username);

    List<Order> findALlOrders();
}

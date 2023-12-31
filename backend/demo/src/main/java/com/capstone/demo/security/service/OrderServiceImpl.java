package com.capstone.demo.security.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.demo.security.entity.Order;
import com.capstone.demo.security.entity.OrderDetail;
import com.capstone.demo.security.entity.ShoppingCart;
import com.capstone.demo.security.entity.User;
import com.capstone.demo.security.repository.IUserRepository;
import com.capstone.demo.security.repository.OrderDetailRepository;
import com.capstone.demo.security.repository.OrderRepository;
import com.capstone.demo.security.repository.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ShoppingCartRepository shoppingCartRepository;
    @Autowired
    OrderDetailRepository detailRepository;
    @Autowired
    IUserRepository customerRepository;
    @Autowired
    ShoppingCartServiceImpl cartService;

    @Override
    public Order save(ShoppingCart shoppingCart) {
        Order order = new Order();
        order.setCustomer(shoppingCart.getCustomer());
        order.setTotalPrice(shoppingCart.getTotalPrices());

        order.setOrderDate(LocalDate.now());

        List<OrderDetail> orderDetailList = new ArrayList<>();
        shoppingCart.getCartItem().forEach(item -> {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setTotalPrice(item.getTotalPrice());
            orderDetail.setUnitPrice(item.getTotalPrice() / item.getQuantity());
            orderDetail.setProduct(item.getProduct());
            detailRepository.save(orderDetail);
            orderDetailList.add(orderDetail);
        });

        order.setOrderDetailList(orderDetailList);
        orderRepository.save(order);
        cartService.deleteCartById(shoppingCart.getId());

        return order;
    }

    @Override
    public List<Order> findAll(String username) {
        Optional<User> customer = customerRepository.findByUsername(username);
        List<Order> orders = customer.get().getOrders();
        return orders;
    }

    @Override
    public List<Order> findALlOrders() {
        return orderRepository.findAll();
    }

    public List<OrderDetail> findOrderDetail() {
        return detailRepository.findAll();
    }

}

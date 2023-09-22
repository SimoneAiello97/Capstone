package com.capstone.demo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.demo.security.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
}

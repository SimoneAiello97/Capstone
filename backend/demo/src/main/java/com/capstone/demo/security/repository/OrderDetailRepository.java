package com.capstone.demo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.demo.security.entity.Order;
import com.capstone.demo.security.entity.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{
    @Query("select o from Order o where o.customer.id = ?1")
    List<Order> findAllByCustomerId(Long id);
}

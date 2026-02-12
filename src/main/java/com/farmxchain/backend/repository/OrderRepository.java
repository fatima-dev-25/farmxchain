package com.farmxchain.backend.repository;

import com.farmxchain.backend.entity.Order;
import com.farmxchain.backend.entity.OrderStatus;
import com.farmxchain.backend.entity.User;
import com.farmxchain.backend.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer(User buyer);
    List<Order> findByFarmer(Farmer farmer);
    List<Order> findByDistributor(User distributor);
    List<Order> findByDistributorAndStatus(User distributor, OrderStatus status);
}
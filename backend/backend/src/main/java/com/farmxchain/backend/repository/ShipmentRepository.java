package com.farmxchain.backend.repository;

import com.farmxchain.backend.entity.Shipment;
import com.farmxchain.backend.entity.ShipmentStatus;
import com.farmxchain.backend.entity.Order;
import com.farmxchain.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findByOrder(Order order);
    List<Shipment> findByDistributor(User distributor);
    List<Shipment> findByDistributorAndStatus(User distributor, ShipmentStatus status);
}
package com.farmxchain.backend.entity;

public enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    ASSIGNED,      // Order assigned to distributor
    IN_TRANSIT,    // Shipment in progress
    SHIPPED,
    DELIVERED,
    COMPLETED,
    CANCELLED
}
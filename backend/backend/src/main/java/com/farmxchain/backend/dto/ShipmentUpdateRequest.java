package com.farmxchain.backend.dto;

import com.farmxchain.backend.entity.ShipmentStatus;
import lombok.Data;

@Data
public class ShipmentUpdateRequest {
    private String location;
    private Double temperature;
    private Double humidity;
    private ShipmentStatus status;
}
package com.farmxchain.backend.dto;

import com.farmxchain.backend.entity.ShipmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentStatusUpdateRequest {
    private ShipmentStatus status;
    private String currentLocation;
    private Double temperature;
    private Double humidity;
    private String notes;
}
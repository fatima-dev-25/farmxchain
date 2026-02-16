package com.farmxchain.backend.dto;

import com.farmxchain.backend.entity.TransportMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentRequest {
    private Long orderId;
    private String origin;
    private String destination;
    private TransportMode transportMode;
}
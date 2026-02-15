package com.farmxchain.backend.dto;

import com.farmxchain.backend.entity.ShipmentStatus;
import com.farmxchain.backend.entity.TransportMode;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ShipmentDTO {
    private Long id;
    private Long orderId;
    private Long distributorId;
    private String distributorName;
    private String origin;
    private String destination;
    private TransportMode transportMode;
    private String currentLocation;
    private Double temperature;
    private Double humidity;
    private ShipmentStatus status;
    private LocalDateTime lastUpdated;
    private String blockchainTxHash;
    private String custodyHash;
    private List<ShipmentLogDTO> logs;
}
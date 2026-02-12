package com.farmxchain.backend.dto;
import com.farmxchain.backend.entity.ShipmentAction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentLogDTO {
    private Long id;
    private Long shipmentId;
    private ShipmentAction action;
    private String location;
    private String notes;
    private LocalDateTime createdAt;
    private String blockchainTxHash;
}

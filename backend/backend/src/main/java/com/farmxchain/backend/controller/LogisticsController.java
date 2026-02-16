package com.in.farmxchain.backend.controller;

import com.farmxchain.backend.dto.ApiResponse;
import com.farmxchain.backend.dto.ShipmentDTO;
import com.farmxchain.backend.dto.ShipmentUpdateRequest;
import com.farmxchain.backend.security.SecurityUtils;
import com.farmxchain.backend.service.LogisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/logistics")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LogisticsController {

    @Autowired
    private LogisticsService logisticsService;

    @PostMapping("/order/{orderId}")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ApiResponse<ShipmentDTO>> startShipment(@PathVariable Long orderId) {
        Long farmerUserId = SecurityUtils.getCurrentUserId();
        ShipmentDTO shipment = logisticsService.createShipment(orderId, farmerUserId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Shipment started", shipment));
    }

    @PatchMapping("/{shipmentId}")
    @PreAuthorize("hasAnyRole('FARMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<ShipmentDTO>> updateShipment(@PathVariable Long shipmentId, @RequestBody ShipmentUpdateRequest request) {
        ShipmentDTO shipment = logisticsService.updateShipment(
                shipmentId,
                request.getLocation(),
                request.getTemperature(),
                request.getHumidity(),
                request.getStatus()
        );
        return ResponseEntity.ok(new ApiResponse<>(true, "Shipment updated", shipment));
    }

    @GetMapping("/order/{orderId}")
    @PreAuthorize("hasAnyRole('FARMER', 'CONSUMER', 'RETAILER', 'DISTRIBUTOR', 'ADMIN')")
    public ResponseEntity<ApiResponse<ShipmentDTO>> getShipmentByOrder(@PathVariable Long orderId) {
        ShipmentDTO shipment = logisticsService.getShipmentByOrderId(orderId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Shipment fetched", shipment));
    }
}
package com.farmxchain.backend.controller;

import com.farmxchain.backend.dto.ApiResponse;
import com.farmxchain.backend.dto.OrderDTO;
import com.farmxchain.backend.dto.OrderRequest;
import com.farmxchain.backend.entity.OrderStatus;
import com.farmxchain.backend.security.SecurityUtils;
import com.farmxchain.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasAnyRole('BUYER', 'RETAILER', 'DISTRIBUTOR', 'CONSUMER')")
    public ResponseEntity<ApiResponse<OrderDTO>> placeOrder(@RequestBody OrderRequest request, Authentication authentication) {
        Long userId = SecurityUtils.getCurrentUserId();
        OrderDTO order = orderService.placeOrder(userId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order placed successfully", order));
    }

    @GetMapping("/buyer")
    @PreAuthorize("hasAnyRole('BUYER', 'RETAILER', 'DISTRIBUTOR', 'CONSUMER')")
    public ResponseEntity<ApiResponse<List<OrderDTO>>> getMyPurchases(Authentication authentication) {
        Long userId = SecurityUtils.getCurrentUserId();
        List<OrderDTO> orders = orderService.getOrdersByBuyer(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Purchases fetched successfully", orders));
    }

    @GetMapping("/farmer")
    @PreAuthorize("hasRole('FARMER')")
    public ResponseEntity<ApiResponse<List<OrderDTO>>> getMySales(Authentication authentication) {
        Long userId = SecurityUtils.getCurrentUserId();
        List<OrderDTO> orders = orderService.getOrdersByFarmer(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Sales fetched successfully", orders));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<ApiResponse<OrderDTO>> updateStatus(@PathVariable Long orderId, @RequestParam OrderStatus status) {
        Long userId = SecurityUtils.getCurrentUserId();
        OrderDTO order = orderService.updateOrderStatus(userId, orderId, status);
        return ResponseEntity.ok(new ApiResponse<>(true, "Order status updated to " + status, order));
    }
}
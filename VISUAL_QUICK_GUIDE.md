# 🌾 FarmXChain - Quick Visual Guide

## 🏗️ System Architecture at a Glance

```
┌────────────────────────────────────────────────────────────────────┐
│                          USER BROWSERS                             │
│                                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  │   Farmer    │  │ Distributor │  │   Retailer  │  │  Consumer   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
│         │                │                │                │
│         └────────────────┼────────────────┼────────────────┘
│                          │                │
│                   HTTP / HTTPS            │
│                    (JSON API)             │
│                          │                │
└──────────────────────────┼────────────────┼──────────────────────┘
                           │                │
                    ┌──────▼────────────────▼──────┐
                    │                              │
                    │   REACT FRONTEND             │
                    │   (User Interface)           │
                    │                              │
                    │  - Login/Register            │
                    │  - Marketplace               │
                    │  - Dashboard                 │
                    │  - Order Tracking            │
                    │  - Admin Panel               │
                    │                              │
                    └──────┬──────────────────┬────┘
                           │                  │
                    REST API Requests    JWT Tokens
                           │                  │
                    ┌──────▼──────────────────▼────┐
                    │                              │
                    │   SPRING BOOT BACKEND        │
                    │   (Business Logic)           │
                    │                              │
                    │  - Authentication (JWT)      │
                    │  - Authorization (RBAC)      │
                    │  - Order Processing          │
                    │  - Wallet Management         │
                    │  - Farmer Verification       │
                    │                              │
                    └────┬──────────────────┬──────┘
                         │                  │
              ┌──────────┴──────┐  ┌────────┴──────────┐
              │                 │  │                   │
         ┌────▼──────┐  ┌───────▼──▼──────┐  ┌────────▼──────┐
         │            │  │                 │  │               │
         │   MYSQL    │  │   BLOCKCHAIN    │  │   EXTERNAL    │
         │  DATABASE  │  │   (Ganache)     │  │   SERVICES    │
         │            │  │                 │  │               │
         │ - Users    │  │ - Smart         │  │ - Maps API    │
         │ - Farmers  │  │   Contracts     │  │ - Weather API │
         │ - Crops    │  │ - Transactions  │  │ - SMS/Email   │
         │ - Orders   │  │ - Ledger        │  │               │
         │ - Shipment │  │                 │  │               │
         │            │  │                 │  │               │
         └────────────┘  └─────────────────┘  └───────────────┘
```

---

## 👥 User Roles & Access Matrix

```
                    FARMER  DISTRIBUTOR  RETAILER  CONSUMER  ADMIN
┌──────────────────────────────────────────────────────────────────┐
│ Browse Marketplace          │    ✓        ✓         ✓       ✓    │
│ View Farmer Details         │    ✓        ✓         ✓       ✓    │
│ Place Order                 │    ✓        ✓         ✓       ✓    │
│ Track Delivery              │    ✓        ✓         ✓       ✓    │
│ Add Crops to Marketplace    │    ✓                             ✓  │
│ Manage Crop Listings        │    ✓                             ✓  │
│ View Own Orders/Sales       │    ✓        ✓         ✓       ✓    │
│ Verify Farmer Credentials   │                                ✓   │
│ Manage Users                │                                ✓   │
│ View Platform Statistics    │                                ✓   │
│ Block/Unblock Users         │                                ✓   │
│ View All Transactions       │                                ✓   │
│ Farmer Dashboard            │    ✓                                │
│ Consumer Dashboard          │                             ✓       │
│ Admin Dashboard             │                                ✓   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Main Workflows (Simplified)

### Workflow 1: Farmer Registration & Crop Listing
```
Farmer fills registration form
            ↓
Email/password stored (BCrypt encrypted)
            ↓
Account created (PENDING status)
            ↓
Admin reviews credentials
            ↓
Admin approves → Status = ACTIVE
            ↓
Farmer logs in
            ↓
Farmer fills farm profile
            ↓
Farmer adds crops (name, quantity, price)
            ↓
Crop registered on blockchain
            ↓
Crop visible in marketplace
            ↓
Other users can purchase
```

### Workflow 2: Buyer Places Order
```
Buyer browses marketplace
            ↓
Selects crop
            ↓
Enters quantity (kg)
            ↓
System calculates: Total = Quantity × Price/kg
            ↓
Buyer clicks "Purchase"
            ↓
System checks wallet balance
            ↓
System deducts from buyer wallet
            ↓
System credits farmer wallet
            ↓
Order created (PENDING status)
            ↓
Shipment assigned
            ↓
Buyer receives tracking link
            ↓
Order status updates automatically
            ↓
Order delivered → Status = DELIVERED
```

### Workflow 3: Admin Manages Platform
```
Admin logs in → Admin Dashboard
            ↓
┌───────────────────────────────────────┐
│  View Statistics                      │
│  - Total users: 1000                  │
│  - Total orders: 5000                 │
│  - Total revenue: $500,000            │
│  - Active listings: 200               │
└───────────────────────────────────────┘
            ↓
┌───────────────────────────────────────┐
│  Farmer Management                    │
│  - Pending verifications: 50          │
│  - Review credentials                 │
│  - Approve/Reject                     │
│  - Verified farmers: 800              │
└───────────────────────────────────────┘
            ↓
┌───────────────────────────────────────┐
│  User Management                      │
│  - Block suspicious users             │
│  - Verify accounts                    │
│  - View user details                  │
│  - Handle complaints                  │
└───────────────────────────────────────┘
```

---

## 💾 Database Schema (Simplified)

```
┌─────────────────────────────┐
│       USERS TABLE           │
├─────────────────────────────┤
│ id (PK)                     │
│ email (UNIQUE)              │
│ password (encrypted)        │
│ name                        │
│ role (FARMER/DIST/RET/CON/ADMIN)│
│ status (PENDING/ACTIVE...)  │
│ balance (wallet)            │
│ created_at                  │
└──────────┬──────────────────┘
           │ OneToOne
           │
┌──────────▼──────────────────┐
│      FARMERS TABLE          │
├─────────────────────────────┤
│ id (PK)                     │
│ user_id (FK)                │
│ farm_name                   │
│ farm_location               │
│ verification_status         │
│ bank_details                │
└──────────┬──────────────────┘
           │ OneToMany
           │
┌──────────▼──────────────────┐
│       CROPS TABLE           │
├─────────────────────────────┤
│ id (PK)                     │
│ farmer_id (FK)              │
│ crop_name                   │
│ quantity_kg                 │
│ price_per_kg                │
│ blockchain_hash             │
└──────────┬──────────────────┘
           │ OneToMany
           │
┌──────────▼──────────────────┐
│       ORDERS TABLE          │
├─────────────────────────────┤
│ id (PK)                     │
│ buyer_id (FK to users)      │
│ farmer_id (FK)              │
│ crop_id (FK)                │
│ quantity                    │
│ total_price                 │
│ status                      │
│ blockchain_tx_hash          │
└──────────┬──────────────────┘
           │
┌──────────▼──────────────────┐
│      SHIPMENTS TABLE        │
├─────────────────────────────┤
│ id (PK)                     │
│ order_id (FK)               │
│ current_location            │
│ status                      │
│ temperature, humidity       │
│ blockchain_tx_hash          │
└─────────────────────────────┘
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│   USER BROWSER (Frontend)           │
│   - Email/Password Input            │
│   - Form Validation                 │
│   - HTTPS Only                      │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   NETWORK LAYER                     │
│   - HTTPS Encryption                │
│   - TLS/SSL Certificate             │
│   - Secure Cookie Transmission      │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   API GATEWAY                       │
│   - CORS Validation                 │
│   - Rate Limiting                   │
│   - Request Logging                 │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   AUTHENTICATION (JWT)              │
│   - Token Validation                │
│   - Expiration Check                │
│   - Signature Verification          │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   AUTHORIZATION (RBAC)              │
│   - Role Check                      │
│   - Permission Validation           │
│   - Method-Level Security           │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   BUSINESS LOGIC                    │
│   - Data Validation                 │
│   - Business Rules Check            │
│   - Audit Logging                   │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│   DATABASE LAYER                    │
│   - Encrypted Connections           │
│   - SQL Injection Prevention        │
│   - Row-Level Security              │
│   - Encrypted Sensitive Data        │
└─────────────────────────────────────┘
```

---

## 📡 API Endpoints Summary

```
AUTHENTICATION
├── POST /auth/register          → Create new user account
├── POST /auth/login             → Login and get JWT token
└── GET  /auth/validate          → Validate current token

CROPS & MARKETPLACE
├── GET  /crops/marketplace      → Browse all crops
├── GET  /crops/{id}             → Get crop details
├── POST /crops/add              → Farmer adds crop
├── PUT  /crops/{id}             → Farmer edits crop
└── DELETE /crops/{id}           → Farmer deletes crop

ORDERS
├── POST /orders/create          → Create new order
├── GET  /orders                 → View user's orders
├── GET  /orders/{id}            → Order details
├── PUT  /orders/{id}/cancel     → Cancel order
└── GET  /orders/{id}/tracking   → Track order status

FARMERS
├── GET  /farmers                → List all farmers
├── GET  /farmers/{id}           → Farmer profile
├── POST /farmers/profile        → Create profile
└── PUT  /farmers/{id}/profile   → Update profile

USERS
├── GET  /users/profile          → Current user profile
├── PUT  /users/profile          → Update profile
├── GET  /users/wallet           → Wallet balance
└── GET  /users/transactions     → Transaction history

ADMIN
├── GET  /admin/users            → List all users
├── GET  /admin/farmers/pending  → Pending verifications
├── POST /admin/verify/{id}      → Verify farmer
├── POST /admin/block/{id}       → Block user
├── GET  /admin/statistics       → Platform stats
└── GET  /admin/orders           → All orders
```

---

## 🔄 Request-Response Cycle Example

```
PLACE ORDER Request:
─────────────────────────────────

Frontend sends:
{
  "cropId": 123,
  "quantity": 50,
  "deliveryAddress": "123 Main St, City"
}

Headers:
- Authorization: Bearer eyJhbGc...
- Content-Type: application/json

─────────────────────────────────

Backend processes:
1. Extract JWT token
2. Verify signature & expiration
3. Extract user from token
4. Validate crop exists
5. Check quantity available
6. Check wallet balance
7. Calculate total price
8. Deduct from buyer
9. Credit farmer
10. Create order record
11. Create shipment
12. Register on blockchain
13. Save transaction hash

─────────────────────────────────

Backend responds:
HTTP 201 Created
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": 5001,
    "status": "PENDING",
    "totalPrice": 2500,
    "trackingId": "TRK-5001-XYZ",
    "blockchainHash": "0x1234...",
    "estimatedDelivery": "2026-09-05"
  }
}

─────────────────────────────────

Frontend updates:
1. Show success message
2. Update order list
3. Redirect to order tracking
4. Refresh wallet balance
```

---

## ⏱️ Typical User Sessions

### Farmer Daily Session (15 min)
```
10:00 - Login
10:02 - Check new orders (3 new)
10:05 - View sales history
10:08 - Add new crop listing
10:10 - Check earnings/wallet
10:12 - View farmer profile stats
10:15 - Logout
```

### Retailer Daily Session (30 min)
```
14:00 - Login
14:05 - Browse marketplace
14:15 - Place orders (5 crops)
14:20 - Checkout and pay
14:22 - Track existing orders
14:28 - View order history
14:30 - Logout
```

### Admin Daily Session (1 hour)
```
09:00 - Login
09:05 - View dashboard stats
09:10 - Review pending farmer verifications (10 pending)
09:25 - Approve 8 farmers
09:30 - Check system health
09:35 - Review reported issues (2 issues)
09:45 - Block 1 suspicious user
09:50 - View transaction logs
09:55 - Generate daily report
10:00 - Logout
```

---

## 📊 Key Metrics Dashboard

```
┌────────────────────────────────┐
│    PLATFORM OVERVIEW           │
├────────────────────────────────┤
│ Total Users:          5,234    │
│ Active Farmers:       1,245    │
│ Active Retailers:     2,156    │
│ Active Consumers:     1,833    │
│                                │
│ Today's Orders:         245    │
│ Today's Revenue:   $15,400     │
│ Avg Order Value:      $63      │
│                                │
│ Active Crops:        2,847     │
│ Pending Verification:   45     │
│ Blockchain Tx:      12,543     │
└────────────────────────────────┘
```

---

## 🚀 Development & Deployment Stack

```
DEVELOPMENT ENVIRONMENT:
├── Backend:    Spring Boot 4.0.1 (Java 17)
├── Frontend:   React 18 (Node.js 20+)
├── Database:   MySQL 8.4
├── Blockchain: Ganache (Local Ethereum)
└── Tools:      Maven, npm, Docker (optional)

PRODUCTION ENVIRONMENT:
├── Backend:    Spring Boot on AWS/Azure
├── Frontend:   React build on CDN
├── Database:   MySQL RDS
├── Blockchain: Sepolia/Mainnet Ethereum
└── DevOps:     CI/CD Pipeline (GitHub Actions)

BUILD PROCESS:
Frontend:  npm install → npm build → Minified bundle
Backend:   mvn clean install → mvn package → JAR file
Database:  MySQL dump → Run migrations
Deploy:    Docker containers or traditional servers
```

---

## 💡 Key Technologies Explained

```
╔════════════════════════════════════════════════╗
║           WHY EACH TECHNOLOGY?                 ║
╠════════════════════════════════════════════════╣
║ Spring Boot  - Enterprise backend, built-in   ║
║               security, database ORM          ║
║                                               ║
║ React        - Interactive UI, component      ║
║               reusability, large community    ║
║                                               ║
║ MySQL        - Relational data, ACID          ║
║               compliance, wide adoption       ║
║                                               ║
║ JWT          - Stateless auth, mobile         ║
║               friendly, standard protocol     ║
║                                               ║
║ Blockchain   - Immutability, transparency,    ║
║               decentralized verification      ║
║                                               ║
║ Tailwind CSS - Utility-first, responsive,     ║
║               professional design             ║
╚════════════════════════════════════════════════╝
```

---

## 🎯 How to Navigate the Application

```
FARMER LOGIN PATH:
Login → Dashboard → Add Crop → Crop Listing Management
      → View Orders → Track Payments → Earnings History

RETAILER LOGIN PATH:
Login → Dashboard → Browse Marketplace → Select Crops
     → Place Orders → Checkout → Track Orders

ADMIN LOGIN PATH:
Login → Admin Dashboard → User Management → Farmer Verification
     → Platform Stats → Transaction History → System Logs

CONSUMER LOGIN PATH:
Login → Dashboard → Marketplace → Search/Filter
     → Place Order → Track Delivery → Leave Review
```

---

## ✅ Quality Assurance

```
Testing Layers:
├── Frontend Unit Tests       (Jest)
├── Frontend Integration Tests (React Testing Library)
├── Backend Unit Tests        (JUnit)
├── Backend Integration Tests (MockMvc)
├── API Tests                 (Postman/Insomnia)
├── Database Tests            (SQL queries)
├── Blockchain Tests          (Hardhat)
└── E2E Tests                 (Selenium/Cypress)

Security Testing:
├── OWASP Top 10 Checks
├── SQL Injection Prevention
├── XSS Prevention
├── CSRF Protection
├── Authentication Testing
├── Authorization Testing
└── Encryption Verification
```

---

**Quick Reference Created**: September 1, 2026  
**Version**: 1.0

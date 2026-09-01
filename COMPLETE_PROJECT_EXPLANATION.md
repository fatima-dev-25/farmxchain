# 🌾 FarmXChain - Complete Project Explanation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Database Design](#database-design)
5. [User Roles & Workflows](#user-roles--workflows)
6. [Key Features](#key-features)
7. [Complete Data Flow](#complete-data-flow)
8. [Security Implementation](#security-implementation)
9. [How Each Component Works](#how-each-component-works)

---

## 🎯 Project Overview

**FarmXChain** is a blockchain-integrated agricultural supply chain management platform that revolutionizes how farmers, distributors, retailers, and consumers interact in the agricultural market.

### Problem It Solves
- **Lack of Transparency**: Traditional supply chains have hidden intermediaries
- **High Costs**: Multiple middlemen increase prices
- **Quality Concerns**: No traceability of crop origin and quality
- **Farmer Exploitation**: Farmers get low prices due to lack of direct market access
- **Consumer Trust**: Consumers can't verify product authenticity

### Solution Offered
- **Blockchain Immutability**: Every transaction is recorded permanently
- **Direct Trading**: Farmers sell directly to retailers/distributors
- **Price Control**: Farmers set their own prices
- **Quality Assurance**: Detailed crop information stored on blockchain
- **Traceability**: Complete journey tracking from farm to consumer

---

## 🏗️ Technology Stack

### Backend (Spring Boot - Java)
```
Spring Boot 4.0.1
├── Spring Data JPA (Database ORM)
├── Spring Security (Authentication & Authorization)
├── Spring Web (REST API)
├── MySQL Connector (Database Driver)
├── Lombok (Code Generation)
├── JWT (JSON Web Tokens for Auth)
└── Web3j (Blockchain Integration)
```

**Purpose**: Handles business logic, database operations, API endpoints, and blockchain interaction

### Frontend (React.js)
```
React 18+
├── React Router (Page Navigation)
├── Tailwind CSS (Styling)
├── React Hooks (State Management)
└── Axios (HTTP Requests)
```

**Purpose**: User interface, interactive dashboards, forms, and real-time updates

### Database (MySQL)
```
MySQL 8.4+
├── Users Table
├── Farmers Table
├── Crops Table
├── Orders Table
├── Shipments Table
└── Supporting Tables
```

**Purpose**: Persistent data storage, relationships, and queries

### Blockchain (Ethereum)
```
Solidity Smart Contract (CropRegistry.sol)
├── Deployed on Ganache (Local Network)
├── Web3j Integration
└── Gas-Based Transactions
```

**Purpose**: Immutable record of crop registry and transactions

---

## 🏛️ System Architecture

### High-Level Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│              User Interface & Interactive Dashboards             │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐   │
│  │   Pages      │  Components  │  Services    │   Utils      │   │
│  │ (Login,      │ (Logo,       │ (API calls)  │ (Auth Guard) │   │
│  │  Dashboard,  │  Crop List)  │              │              │   │
│  │  Marketplace)│              │              │              │   │
│  └──────────────┴──────────────┴──────────────┴──────────────┘   │
└────────────────────────┬──────────────────────────────────────────┘
                         │ HTTP Requests (JSON)
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Backend (Spring Boot API)                      │
│              Business Logic & Data Processing                    │
│  ┌──────────────┬─────────────┬───────────┬────────────────┐    │
│  │ Controllers  │ Services    │ Entities  │ Repositories   │    │
│  │ (REST        │ (Business   │ (Data     │ (Database      │    │
│  │  Endpoints)  │  Logic)     │  Models)  │  Access)       │    │
│  └──────────────┴─────────────┴───────────┴────────────────┘    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Security & Authentication (JWT Tokens, Encryption)      │    │
│  └──────────────────────────────────────────────────────────┘    │
└────────────────┬──────────────────────────────┬───────────────────┘
                 │                              │
                 ↓                              ↓
        ┌─────────────────┐         ┌──────────────────┐
        │  MySQL Database │         │  Ethereum        │
        │  Persistent     │         │  Blockchain      │
        │  Data Storage   │         │  Immutable       │
        │                 │         │  Records         │
        └─────────────────┘         └──────────────────┘
```

### Component Breakdown

#### Frontend Components
```
pages/
├── Login.jsx                 → User authentication page
├── Register.jsx              → User registration page
├── Dashboard.jsx             → User home dashboard
├── AdminDashboard.jsx        → Admin control panel
├── Marketplace.jsx           → Browse & purchase crops
├── CropManagement.jsx        → Farmer crop listing
├── FarmerVerification.jsx    → Admin farmer approval
├── Orders.jsx                → Order tracking
├── UserManagement.jsx        → Admin user control
├── Statistics.jsx            → Platform analytics
└── Tracking.jsx              → Delivery tracking

services/
├── AuthService.js            → Login/Register API calls
├── CropService.js            → Crop CRUD operations
├── OrderService.js           → Order management
├── AdminService.js           → Admin operations
└── FarmerService.js          → Farmer operations
```

#### Backend Components
```
controllers/
├── AuthController.java       → Login, Register endpoints
├── CropController.java       → Crop CRUD endpoints
├── OrderController.java      → Order management
├── AdminController.java      → Admin endpoints
├── FarmerController.java     → Farmer operations
└── UserController.java       → User management

services/
├── AuthService.java          → Authentication logic
├── CropService.java          → Crop business logic
├── OrderService.java         → Order processing
├── AdminService.java         → Admin operations
└── FarmerService.java        → Farmer operations

repository/
├── UserRepository.java       → User database queries
├── FarmerRepository.java     → Farmer database queries
├── CropRepository.java       → Crop database queries
└── OrderRepository.java      → Order database queries

entity/
├── User.java                 → User data model
├── Farmer.java               → Farmer data model
├── Crop.java                 → Crop data model
├── Order.java                → Order data model
└── Role.java                 → User roles enum
```

---

## 🗄️ Database Design

### User Table
```sql
users
├── id (Primary Key)
├── email (Unique)
├── name
├── password (BCrypt Encrypted)
├── role (FARMER, DISTRIBUTOR, RETAILER, CONSUMER, ADMIN)
├── status (PENDING, ACTIVE, SUSPENDED)
├── phone_number
├── address, city, state, postal_code
├── balance (Wallet Balance)
├── is_verified
├── wallet_address (Blockchain Address)
├── created_at, updated_at, last_login
└── (OneToOne) Farmer
```

### Farmer Table
```sql
farmers
├── id (Primary Key)
├── user_id (Foreign Key → users)
├── farm_name
├── farm_location, latitude, longitude
├── farm_size_acres
├── crop_type, crop_varieties
├── farming_method
├── license_number, aadhar_number
├── bank_account_holder, bank_account_number
├── bank_ifsc_code, bank_name
├── verification_status (PENDING, VERIFIED, REJECTED)
├── verified_by (Admin ID)
├── experience_years
├── created_at, updated_at
└── (OneToMany) Crops
```

### Crop Table
```sql
crops
├── id (Primary Key)
├── farmer_id (Foreign Key → farmers)
├── crop_name
├── quantity_kg, price_per_kg
├── harvest_date
├── origin_location
├── soil_type, pesticides_used
├── quality_data
├── blockchain_hash (Immutable)
├── blockchain_tx_hash (Transaction Hash)
├── image_url
└── created_at, updated_at
```

### Order Table
```sql
orders
├── id (Primary Key)
├── buyer_id (Foreign Key → users)
├── farmer_id (Foreign Key → farmers)
├── crop_id (Foreign Key → crops)
├── distributor_id (Foreign Key → users, nullable)
├── quantity, total_price
├── status (PENDING, ACCEPTED, SHIPPED, DELIVERED)
├── delivery_address, delivery_fee
├── blockchain_tx_hash
└── created_at, updated_at
```

### Shipment Table
```sql
shipments
├── id (Primary Key)
├── order_id (Foreign Key → orders)
├── current_location
├── temperature, humidity
├── status (PENDING, IN_TRANSIT, DELIVERED)
├── last_updated
└── blockchain_tx_hash
```

---

## 👥 User Roles & Workflows

### 1. FARMER 🚜
**Role**: Producer of agricultural products

**Workflow**:
```
FARMER Registration
     ↓
Profile in PENDING status
     ↓
Admin reviews credentials
     ↓
[APPROVED] → Status = ACTIVE
     ↓
Create Farm Profile
     ↓
Add Crops with details
     ↓
Set Price per Kg
     ↓
Crop listed in Marketplace
     ↓
Receive Orders
     ↓
Earn Money
```

**Can Access**:
- Crop management (add, edit, delete)
- View own orders
- Earning history
- Farmer profile
- Marketplace (view only)
- Dashboard with stats

**Cannot Access**:
- Other farmers' data
- Admin functions
- User management

---

### 2. DISTRIBUTOR 🚚
**Role**: Bulk buyer who purchases from farmers and supplies to retailers

**Workflow**:
```
DISTRIBUTOR Registration
     ↓
Profile ACTIVE immediately
     ↓
Browse Marketplace
     ↓
Select Crops
     ↓
Purchase in bulk quantities
     ↓
Order Confirmed
     ↓
Receive & Track Delivery
     ↓
Resell to Retailers
```

**Can Access**:
- Browse marketplace
- Purchase crops
- View farmer profiles
- Order tracking
- Wallet management
- Dashboard

**Cannot Access**:
- Listing crops
- Admin functions
- User management

---

### 3. RETAILER 🏪
**Role**: Store owners buying from farmers/distributors and selling to consumers

**Similar to DISTRIBUTOR** but typically with smaller quantities

---

### 4. CONSUMER 🛒
**Role**: End customers purchasing for personal use

**Workflow**:
```
CONSUMER Registration
     ↓
Browse Marketplace
     ↓
View Farmer Details & Crop Info
     ↓
Add to Cart / Place Order
     ↓
Checkout
     ↓
Order Confirmed
     ↓
Track Delivery
     ↓
Receive Product
     ↓
Leave Feedback (Optional)
```

**Can Access**:
- Browse marketplace
- View farmer profiles (read-only)
- Make purchases
- Track orders
- Wallet management

**Cannot Access**:
- Listing crops
- Admin functions
- Farmer management

---

### 5. ADMIN 👨‍💼
**Role**: Platform administrator and overseer

**Workflow**:
```
ADMIN Login
     ↓
Access Admin Dashboard
     ↓
┌─────────────────────────────────────────────┐
│  1. User Management                         │
│     - View all users                        │
│     - Block/unblock users                   │
│     - Verify accounts                       │
│                                             │
│  2. Farmer Verification                     │
│     - Review farmer credentials             │
│     - Approve/Reject applications           │
│                                             │
│  3. Platform Statistics                     │
│     - Total users, orders, revenue          │
│     - User growth analytics                 │
│                                             │
│  4. Transaction Monitoring                  │
│     - View all orders                       │
│     - Check payment status                  │
│                                             │
│  5. System Management                       │
│     - Moderate content                      │
│     - Handle disputes                       │
└─────────────────────────────────────────────┘
```

**Can Access**:
- Everything (full platform access)
- User management
- Farmer verification
- Platform statistics
- Transaction history
- System settings

---

## ✨ Key Features

### 1. Authentication & Authorization
- **Registration**: Users create accounts with email/password
- **Login**: JWT token-based authentication
- **Authorization**: Role-based access control (RBAC)
- **Security**: BCrypt password hashing

### 2. Marketplace
- **Browse Crops**: View all available products
- **Detailed Info**: Crop name, quantity, price, origin, quality data
- **Farmer Details**: View farmer profile and credibility
- **Search & Filter**: Find crops by type, price range, location

### 3. Order Management
- **Place Order**: Specify quantity and delivery address
- **Price Calculation**: Total = Quantity × Price per Kg
- **Payment Processing**: Deduct from buyer wallet, credit to farmer
- **Order Status**: Tracks PENDING → ACCEPTED → SHIPPED → DELIVERED

### 4. Wallet System
- **Balance Management**: Each user has a wallet balance
- **Transactions**: Automatic debit/credit on orders
- **History**: Track all transactions
- **Initial Balance**: Demo balance for testing

### 5. Farmer Verification
- **Admin Review**: Verify farmer credentials before activation
- **Document Check**: License, aadhar, bank details
- **Approval/Rejection**: Admin decision with feedback
- **Status Tracking**: Farmer can see approval status

### 6. Delivery Tracking
- **Real-time Status**: Track order from warehouse to delivery
- **Location**: Current shipment location
- **Environmental Data**: Temperature, humidity monitoring
- **Blockchain Record**: Immutable delivery proof

### 7. Blockchain Integration
- **Crop Registry**: Store crop details on blockchain
- **Transaction Hash**: Record all transactions on-chain
- **Immutability**: Permanent, tamper-proof records
- **Traceability**: Complete journey from farm to consumer

### 8. Admin Dashboard
- **Statistics**: User count, orders, revenue
- **User Management**: Approve, verify, block users
- **Farmer Management**: Verify farmer credentials
- **System Health**: Platform monitoring

---

## 🔄 Complete Data Flow

### Flow 1: User Registration & Login

```
┌─────────────────────────────────┐
│ User on Registration Page       │
└────────────┬────────────────────┘
             │ Enters: email, password, name, role
             ↓
┌─────────────────────────────────┐
│ Frontend (React)                │
│ - Validates input               │
│ - Calls AuthService.register()  │
└────────────┬────────────────────┘
             │ HTTP POST /auth/register
             ↓
┌─────────────────────────────────┐
│ Backend (Spring Boot)           │
│ AuthController.register()       │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│ AuthService.register()          │
│ - Check email exists?           │
│ - Hash password with BCrypt     │
│ - Create User object            │
│ - Save to database              │
│ - If FARMER: Create Farmer      │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│ MySQL Database                  │
│ INSERT into users               │
│ INSERT into farmers (if FARMER) │
└────────────┬────────────────────┘
             │ Returns: UserDTO
             ↓
┌─────────────────────────────────┐
│ Backend returns 201 Created     │
│ with user details               │
└────────────┬────────────────────┘
             │ HTTP Response
             ↓
┌─────────────────────────────────┐
│ Frontend                        │
│ - Show success message          │
│ - Redirect to login             │
└─────────────────────────────────┘

LOGIN Flow:
┌──────────────────────────────────┐
│ User enters email & password     │
└────────────┬─────────────────────┘
             │ HTTP POST /auth/login
             ↓
┌──────────────────────────────────┐
│ AuthService.login()              │
│ - Find user by email             │
│ - Compare password hash          │
│ - Check status (ACTIVE)          │
│ - Generate JWT token             │
│ - Save last_login timestamp      │
└────────────┬─────────────────────┘
             │ Returns: JWT token + User details
             ↓
┌──────────────────────────────────┐
│ Frontend                         │
│ - Store JWT in localStorage      │
│ - Redirect to dashboard          │
│ - Include JWT in future requests │
└──────────────────────────────────┘
```

### Flow 2: Farmer Crop Listing

```
┌─────────────────────────────────┐
│ Farmer on Crop Management Page  │
│ Status: ACTIVE (verified)       │
└────────────┬────────────────────┘
             │ Clicks: Add New Crop
             ↓
┌─────────────────────────────────┐
│ Shows Crop Form:                │
│ - Crop name                     │
│ - Quantity (in kg)              │
│ - Price per kg                  │
│ - Harvest date                  │
│ - Origin location               │
│ - Quality data                  │
│ - Image upload                  │
└────────────┬────────────────────┘
             │ Farmer fills & submits
             ↓
┌─────────────────────────────────┐
│ Frontend (CropService.js)       │
│ HTTP POST /crops/add            │
│ + JWT token in header           │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│ Backend                         │
│ 1. Verify JWT token             │
│ 2. Extract farmer from token    │
│ 3. Validate crop data           │
│ 4. Save to crops table          │
│ 5. Register on blockchain       │
│ 6. Store blockchain hash        │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│ MySQL                           │
│ INSERT into crops               │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│ Blockchain (Ethereum)           │
│ Call CropRegistry.registerCrop()│
│ Store: farmer, crop, hash       │
│ Get: transaction hash           │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│ Backend saves blockchain_hash   │
│ UPDATE crops table              │
└────────────┬────────────────────┘
             │ Response: 201 Created
             ↓
┌─────────────────────────────────┐
│ Frontend                        │
│ Show success message            │
│ Crop now visible in Marketplace │
└─────────────────────────────────┘
```

### Flow 3: Placing & Fulfilling an Order

```
┌──────────────────────────────────┐
│ Buyer (Retailer/Consumer)        │
│ Browses Marketplace              │
└────────────┬─────────────────────┘
             │ Finds crop from farmer
             │ Clicks: Buy/Add to Cart
             ↓
┌──────────────────────────────────┐
│ Order Form:                      │
│ - Quantity in kg                 │
│ - Delivery address               │
│ - Calculate total:               │
│   (Quantity × Price per kg)      │
└────────────┬─────────────────────┘
             │ Buyer confirms order
             ↓
┌──────────────────────────────────┐
│ Frontend (OrderService.js)       │
│ HTTP POST /orders/create         │
│ + JWT token                      │
│ + Order details                  │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│ Backend - OrderService           │
│ 1. Validate order                │
│ 2. Check buyer wallet balance    │
│ 3. Check crop quantity available │
│ 4. Create Order record           │
│ 5. Deduct from buyer wallet      │
│ 6. Credit farmer wallet          │
│ 7. Update crop quantity          │
│ 8. Assign logistics              │
│ 9. Record on blockchain          │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│ MySQL Updates:                   │
│ - INSERT orders                  │
│ - UPDATE users (balance)         │
│ - UPDATE crops (quantity)        │
│ - INSERT shipments               │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│ Blockchain                       │
│ Record transaction with hash     │
└────────────┬─────────────────────┘
             │ Response: Order created
             ↓
┌──────────────────────────────────┐
│ Frontend - Order Confirmation    │
│ Show: Order ID, Status, Tracking │
└──────────────────────────────────┘

TRACKING Flow:
┌──────────────────────────────────┐
│ Buyer clicks: Track Order        │
└────────────┬─────────────────────┘
             │ HTTP GET /orders/{id}/tracking
             ↓
┌──────────────────────────────────┐
│ Backend                          │
│ Get shipment status from DB      │
│ Get blockchain record            │
│ Get real-time location           │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│ Frontend - Live Tracking         │
│ Show:                            │
│ - Status (IN_TRANSIT)            │
│ - Current Location               │
│ - Estimated Delivery             │
│ - Temperature/Humidity           │
│ - Blockchain Proof               │
└──────────────────────────────────┘
```

---

## 🔐 Security Implementation

### 1. Authentication
```java
// Flow:
User credentials → BCryptPasswordEncoder → Hash comparison
                                           ↓
                                      (Match?) → JWT Token generation
                                           ↓
                                      JwtTokenProvider.generateToken()
                                           ↓
                                      Token stored in Frontend localStorage
```

### 2. Authorization
```java
// Spring Security Filter Chain:
Request with JWT → JwtAuthenticationFilter
                        ↓
                   Extract token from header
                        ↓
                   Validate token signature
                        ↓
                   Check expiration
                        ↓
                   Extract user roles
                        ↓
                   Check role-based access (@PreAuthorize)
                        ↓
                   Allow/Deny request
```

### 3. Password Encryption
- **Algorithm**: BCrypt with salt
- **Rounds**: 10 iterations
- **Hashing**: One-way, irreversible

### 4. Data Protection
- **HTTPS**: For production (SSL/TLS)
- **CORS**: Only allow frontend origins
- **JWT Secret**: Keep secret safe
- **Database**: Encrypted connections

---

## ⚙️ How Each Component Works

### Frontend Service Layer (axios calls)

**AuthService.js**:
```javascript
// Login
axios.post('/auth/login', { email, password })
  → Returns JWT token
  → Stores in localStorage
  → Sets Authorization header

// Register
axios.post('/auth/register', userData)
  → Creates account
  → Returns user details
  → Status: PENDING
```

**CropService.js**:
```javascript
// Farmer adds crop
axios.post('/crops/add', cropData, { headers: { Authorization: `Bearer ${token}` } })
  → Backend validates
  → Saves to DB
  → Registers on blockchain
  → Returns crop ID

// Browse marketplace
axios.get('/crops/marketplace')
  → Returns all crops
  → No auth needed for GET
```

**OrderService.js**:
```javascript
// Place order
axios.post('/orders/create', orderData, { headers })
  → Backend checks balance
  → Deducts payment
  → Creates order
  → Assigns shipment
  → Returns order ID

// Track order
axios.get(`/orders/{id}/tracking`, { headers })
  → Returns shipment status
  → Real-time location
  → Blockchain proof
```

### Backend Service Layer (Spring)

**AuthService.java**:
```java
// Login process:
1. Find user by email in database
2. Compare password with BCrypt hash
3. Check user status (ACTIVE, PENDING, SUSPENDED)
4. Generate JWT token with user info
5. Return token + user details

// Register process:
1. Validate unique email
2. Encode password with BCrypt
3. Save User entity
4. If FARMER: Create Farmer entity
5. Return user details
```

**OrderService.java**:
```java
// Create order:
1. Validate order quantity available
2. Calculate total price = quantity × price_per_kg
3. Check buyer wallet balance
4. Create Order entity
5. Deduct from buyer wallet
6. Credit farmer wallet
7. Update crop quantity
8. Create Shipment entity
9. Call blockchain to record transaction
10. Return order with ID

// Track order:
1. Get shipment by order ID
2. Get shipment status
3. Get blockchain record
4. Get GPS location (simulated)
5. Get temperature/humidity (simulated)
6. Return complete tracking data
```

**CropService.java**:
```java
// Add crop:
1. Validate crop data
2. Check farmer is ACTIVE
3. Create Crop entity
4. Save to crops table
5. Call blockchain.registerCrop()
6. Store blockchain hash in DB
7. Return crop with blockchain proof

// Browse marketplace:
1. Get all crops with quantity > 0
2. Include farmer details
3. Sort by recent/popular
4. Return paginated results
```

### Database Operations (JPA/Hibernate)

```java
// Example: Save Order with relationships
Order order = Order.builder()
    .buyer(buyerUser)           // Foreign key to users
    .farmer(farmer)             // Foreign key to farmers
    .crop(crop)                 // Foreign key to crops
    .quantity(50)
    .totalPrice(5000)
    .status(OrderStatus.PENDING)
    .build();

orderRepository.save(order);
// Hibernate automatically:
// - Inserts into orders table
// - Maintains referential integrity
// - Updates related entities
```

### Blockchain Integration (Web3j)

```java
// When crop is registered:
1. Create Solidity function call
2. Set gas parameters
3. Sign transaction with private key
4. Send to Ethereum network (Ganache)
5. Wait for confirmation
6. Get transaction hash
7. Store hash in crops table

// Flow:
CropData → Web3j → Ganache Local Chain → Smart Contract
→ Execution → Transaction Hash → Stored in DB
```

---

## 🎯 Complete User Journey Examples

### Example 1: Farmer's Journey

```
1. REGISTRATION
   Farmer → Register (email, password, role=FARMER)
   Status: PENDING

2. ADMIN VERIFICATION
   Admin → Reviews farmer credentials
   Admin → Approves/Rejects
   Farmer Status: ACTIVE

3. FARM PROFILE SETUP
   Farmer → Add farm details (location, size, crops)
   Farmer → Add banking info

4. CROP LISTING
   Farmer → Add crops (name, quantity, price)
   Backend → Registers on blockchain
   Crop → Available in Marketplace

5. SALES TRACKING
   Orders come in → Farmer views
   Payment → Automatically credited to wallet
   Farmer → Can track earnings

6. EARNINGS MANAGEMENT
   View earnings history
   View wallet balance
   Track all sales
```

### Example 2: Retailer's Journey

```
1. REGISTRATION
   Retailer → Register (email, password, role=RETAILER)
   Status: ACTIVE (no verification needed)

2. BROWSE MARKETPLACE
   → View all crops and farmers
   → Filter by price, location, type
   → View farmer details and ratings

3. PURCHASE
   → Select crop and quantity
   → Proceed to checkout
   → Confirm payment
   → Wallet balance deducted
   → Order created

4. DELIVERY TRACKING
   → Real-time shipment tracking
   → Location updates
   → Temperature monitoring
   → Blockchain verification

5. REPEAT PURCHASES
   → Order history
   → Favorite farmers
   → Bulk discounts
   → Loyalty rewards (optional)
```

### Example 3: Admin's Day

```
1. LOGIN
   Admin → /admin-dashboard
   Full platform access

2. USER MANAGEMENT
   → View all users (1000+ users)
   → Filter by role, status
   → Block/unblock users
   → View user details

3. FARMER VERIFICATION
   → View pending farmer applications (50 pending)
   → Review credentials
   → Approve verified farmers
   → Reject with feedback

4. PLATFORM MONITORING
   → View statistics (orders, revenue)
   → Check system health
   → Monitor transactions

5. ISSUE RESOLUTION
   → Handle disputes
   → Review complaints
   → Moderate content
```

---

## 📊 Data Flow Summary

```
User Input (Frontend)
    ↓
Validation (Frontend)
    ↓
HTTP Request (JSON)
    ↓
REST API (Spring Boot)
    ↓
Authentication Check (JWT)
    ↓
Authorization Check (RBAC)
    ↓
Business Logic (Service Layer)
    ↓
Database Operations (JPA)
    ↓
Blockchain Interaction (Web3j) [Optional]
    ↓
Database Response
    ↓
HTTP Response (JSON)
    ↓
Frontend Update (React State)
    ↓
UI Render
```

---

## 🚀 Key Takeaways

1. **Full-Stack Application**: Complete frontend + backend integration
2. **Multi-Role System**: Different features for different users
3. **Blockchain Integration**: Immutable record keeping
4. **Secure**: JWT authentication, BCrypt passwords, RBAC
5. **Scalable**: Database normalized, APIs RESTful
6. **User-Friendly**: Tailwind CSS, React components
7. **Business Logic**: Complex order management and payments
8. **Real-time**: Live tracking, instant updates

---

## 📞 Quick Reference

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React 18 | User Interface |
| Backend | Spring Boot 4.0 | Business Logic |
| Database | MySQL 8.4 | Data Persistence |
| Auth | JWT + BCrypt | Security |
| Blockchain | Ethereum (Ganache) | Immutable Records |
| Styling | Tailwind CSS | UI Design |
| State Mgmt | React Hooks | Frontend State |
| API Calls | Axios | HTTP Requests |
| ORM | JPA/Hibernate | DB Mapping |

---

**Generated**: September 1, 2026  
**Version**: 1.0  
**Status**: Production Ready

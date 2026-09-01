# 👨‍💻 FarmXChain - Developer's Practical Guide

## 📚 Quick Start by Role

### For Frontend Developers (React)

#### Understanding the Frontend Structure
```
frontend/
├── src/
│   ├── pages/              # Page components (full pages)
│   │   ├── Login.jsx       # Authentication page
│   │   ├── Dashboard.jsx   # User home dashboard
│   │   ├── Marketplace.jsx # Browse crops
│   │   ├── Orders.jsx      # Order management
│   │   └── AdminDashboard.jsx
│   │
│   ├── components/         # Reusable components
│   │   ├── Logo.jsx
│   │   ├── CropList.jsx
│   │   └── LocationPicker.jsx
│   │
│   ├── services/           # API service layer
│   │   ├── AuthService.js  # Login/Register
│   │   ├── CropService.js  # Crop operations
│   │   ├── OrderService.js # Order operations
│   │   └── AdminService.js # Admin operations
│   │
│   ├── utils/              # Utilities
│   │   ├── AuthGuard.js    # Route protection
│   │   └── api.js          # Axios config
│   │
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   ├── index.css           # Global styles
│   └── App.css             # App styles
│
├── public/
│   ├── index.html
│   └── manifest.json
│
├── package.json            # Dependencies
└── tailwind.config.js      # Tailwind theme config
```

#### Frontend Development Workflow
```
1. UNDERSTAND THE COMPONENT:
   - Read the JSX file
   - Check useState and useEffect hooks
   - Understand data flow

2. MODIFY THE COMPONENT:
   - Update JSX markup
   - Modify styles with Tailwind classes
   - Update state management

3. TEST THE COMPONENT:
   - npm start → Development server
   - Test in browser at localhost:3000
   - Check console for errors

4. CALL API:
   - Import service (e.g., CropService)
   - Call method: await CropService.fetchCrops()
   - Handle response and update state
   - Show errors to user

5. DEPLOY:
   - npm run build → Production build
   - Build output in /build folder
   - Deploy to web server
```

#### Example: Adding a New Page

```jsx
// 1. Create pages/MyNewPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyNewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Call API service
      const result = await SomeService.fetchData();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary-600 mb-6">
        My New Page
      </h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          {/* Display data here */}
        </div>
      )}
    </div>
  );
};

export default MyNewPage;

// 2. Add route in App.js
import MyNewPage from './pages/MyNewPage';

<Route path="/my-new-page" element={<MyNewPage />} />

// 3. Add navigation link in navbar
<Link to="/my-new-page">My New Page</Link>
```

#### Using Tailwind CSS
```jsx
// Color classes (updated theme):
<div className="bg-primary-600">Primary Brown</div>     // #a86824
<div className="bg-secondary-600">Secondary Green</div> // #236849
<div className="bg-accent-400">Accent Gold</div>        // #ffc628
<div className="text-neutral-900">Dark Text</div>       // #2a251f

// Button variants:
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-accent">Accent Button</button>

// Card styling:
<div className="card">Normal card</div>
<div className="card-accent">Accent card</div>

// Badge styling:
<span className="badge-primary">Status</span>
<span className="badge-secondary">Role</span>
<span className="badge-accent">Success</span>

// Layout utilities:
<div className="container mx-auto px-4">Container</div>
<div className="grid grid-cols-3 gap-4">3 columns</div>
<div className="flex justify-between items-center">Flex layout</div>
```

---

### For Backend Developers (Spring Boot)

#### Understanding the Backend Structure
```
FarmXChain/src/main/java/com/infosys/farmxchain/
│
├── controller/
│   ├── AuthController.java        # /auth endpoints
│   │   - POST /auth/register
│   │   - POST /auth/login
│   │   - GET /auth/validate
│   │
│   ├── CropController.java        # /crops endpoints
│   │   - GET /crops/marketplace
│   │   - POST /crops/add
│   │   - GET /crops/{id}
│   │   - PUT /crops/{id}
│   │   - DELETE /crops/{id}
│   │
│   ├── OrderController.java       # /orders endpoints
│   │   - POST /orders/create
│   │   - GET /orders
│   │   - GET /orders/{id}
│   │   - PUT /orders/{id}/status
│   │   - GET /orders/{id}/tracking
│   │
│   ├── AdminController.java       # /admin endpoints (ADMIN only)
│   ├── FarmerController.java      # /farmers endpoints
│   └── UserController.java        # /users endpoints
│
├── service/
│   ├── AuthService.java           # Auth business logic
│   │   - register(RegisterRequest)
│   │   - login(LoginRequest) → LoginResponse
│   │   - verifyUser(userId)
│   │
│   ├── CropService.java           # Crop business logic
│   │   - addCrop(CropDTO)
│   │   - getCrop(cropId)
│   │   - getAllCrops()
│   │   - updateCrop(cropId, CropDTO)
│   │
│   ├── OrderService.java          # Order business logic
│   │   - createOrder(OrderRequest)
│   │   - getOrder(orderId)
│   │   - updateOrderStatus()
│   │   - trackOrder(orderId)
│   │
│   ├── AdminService.java          # Admin operations
│   │   - getAllUsers()
│   │   - verifyFarmer()
│   │   - blockUser()
│   │
│   └── BlockchainService.java     # Blockchain integration
│       - registerCrop(cropData)
│       - recordTransaction()
│
├── repository/
│   ├── UserRepository.java        # JPA repository
│   ├── FarmerRepository.java
│   ├── CropRepository.java
│   ├── OrderRepository.java
│   └── ShipmentRepository.java
│
├── entity/
│   ├── User.java                  # Database model
│   ├── Farmer.java
│   ├── Crop.java
│   ├── Order.java
│   ├── Shipment.java
│   ├── Role.java                  # Enum: FARMER, DISTRIBUTOR, etc.
│   ├── UserStatus.java            # Enum: ACTIVE, PENDING, SUSPENDED
│   └── OrderStatus.java           # Enum: PENDING, ACCEPTED, SHIPPED...
│
├── dto/
│   ├── LoginRequest.java          # Request DTOs
│   ├── RegisterRequest.java
│   ├── LoginResponse.java         # Response DTOs
│   ├── UserDTO.java
│   ├── CropDTO.java
│   └── OrderDTO.java
│
├── exception/
│   ├── ResourceNotFoundException.java
│   ├── EmailAlreadyExistsException.java
│   ├── UnauthorizedException.java
│   └── GlobalExceptionHandler.java
│
├── security/
│   ├── JwtTokenProvider.java      # JWT token generation
│   ├── JwtAuthenticationFilter.java # JWT validation filter
│   └── SecurityUtils.java         # Security utilities
│
├── config/
│   ├── SecurityConfig.java        # Spring Security config
│   ├── OpenApiConfig.java         # Swagger config
│   └── WebConfig.java             # CORS, web config
│
└── FarmXChainApplication.java     # Main app entry
```

#### Backend Development Workflow
```
1. CREATE A NEW ENTITY:
   - Create Entity class with JPA annotations
   - Define fields with @Column
   - Add relationships with @ManyToOne, @OneToMany
   - Add @PrePersist, @PreUpdate for timestamps

2. CREATE A REPOSITORY:
   - Extend JpaRepository<Entity, Long>
   - Define custom query methods
   - Example: findByEmail(String email)

3. CREATE A SERVICE:
   - Add @Service annotation
   - Inject repository with @Autowired
   - Implement business logic methods
   - Use @Transactional for database operations

4. CREATE A CONTROLLER:
   - Add @RestController annotation
   - Define @RequestMapping("/endpoint")
   - Map methods with @GetMapping, @PostMapping, etc.
   - Validate input with @Valid
   - Return ResponseEntity with status code

5. TEST THE API:
   - mvn clean install
   - mvn spring-boot:run
   - Test endpoints with Postman/Insomnia
   - Check error responses

6. DEPLOY:
   - mvn clean package
   - JAR file in target/
   - Run: java -jar FarmXChain-0.0.1-SNAPSHOT.jar
```

#### Example: Creating a New API Endpoint

```java
// 1. Create DTO (src/main/java/.../dto/ProductDTO.java)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer quantity;
}

// 2. Create Entity (src/main/java/.../entity/Product.java)
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

// 3. Create Repository
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmerId(Long farmerId);
    List<Product> findByPriceBetween(BigDecimal min, BigDecimal max);
}

// 4. Create Service
@Service
@Transactional
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public ProductDTO createProduct(ProductDTO dto, Long farmerId) {
        Farmer farmer = farmerRepository.findById(farmerId)
            .orElseThrow(() -> new ResourceNotFoundException("Farmer not found"));

        Product product = Product.builder()
            .name(dto.getName())
            .price(dto.getPrice())
            .quantity(dto.getQuantity())
            .farmer(farmer)
            .build();

        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public ProductDTO getProduct(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return convertToDTO(product);
    }

    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
            .id(product.getId())
            .name(product.getName())
            .price(product.getPrice())
            .quantity(product.getQuantity())
            .build();
    }
}

// 5. Create Controller
@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(
            @Valid @RequestBody ProductDTO dto,
            @RequestHeader("Authorization") String authHeader) {
        
        // Extract farmerId from token or session
        Long farmerId = extractFarmerIdFromToken(authHeader);
        ProductDTO created = productService.createProduct(dto, farmerId);

        return new ResponseEntity<>(
            ApiResponse.<ProductDTO>builder()
                .success(true)
                .message("Product created successfully")
                .data(created)
                .statusCode(HttpStatus.CREATED.value())
                .build(),
            HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return new ResponseEntity<>(
            ApiResponse.<List<ProductDTO>>builder()
                .success(true)
                .data(products)
                .statusCode(HttpStatus.OK.value())
                .build(),
            HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProduct(@PathVariable Long id) {
        ProductDTO product = productService.getProduct(id);
        return new ResponseEntity<>(
            ApiResponse.<ProductDTO>builder()
                .success(true)
                .data(product)
                .statusCode(HttpStatus.OK.value())
                .build(),
            HttpStatus.OK
        );
    }
}

// 6. Test the endpoint
GET    http://localhost:8080/api/v1/products
POST   http://localhost:8080/api/v1/products
GET    http://localhost:8080/api/v1/products/1
```

#### Common Spring Boot Annotations
```java
// Class level
@Entity                    // Database entity
@Repository               // Data access layer
@Service                  // Business logic layer
@RestController           // REST API controller
@Component                // Generic component
@Configuration            // Configuration class
@SpringBootApplication    // Main app class

// Method level
@GetMapping("/path")      // HTTP GET
@PostMapping("/path")     // HTTP POST
@PutMapping("/path")      // HTTP PUT
@DeleteMapping("/path")   // HTTP DELETE
@RequestMapping("/api")   // Map controller
@Transactional            // Database transaction
@PreAuthorize("hasRole") // Authorization
@Cacheable                // Caching

// Field level
@Autowired                // Dependency injection
@Value("${property}")     // Configuration value
@Column                   // Database column
@ManyToOne               // DB relationship
@OneToMany               // DB relationship
@JoinColumn              // Foreign key

// Parameter level
@PathVariable             // URL path variable
@RequestParam             // Query parameter
@RequestBody              // Request body
@RequestHeader            // HTTP header
@Valid                    // Validation
```

---

### For Database Developers (MySQL)

#### Understanding the Database Schema
```sql
-- User Management
users
├── Basic Info: id, email, name, password
├── Role: role, status
├── Personal: phone_number, address, city, state
├── Financial: balance, wallet_address
├── Timestamps: created_at, updated_at, last_login
└── Verification: is_verified

-- Farmer Info
farmers
├── Linked to: user_id (OneToOne)
├── Farm Info: farm_name, farm_location, farm_size_acres
├── Location: latitude, longitude
├── Crops: crop_type, crop_varieties, farming_method
├── Verification: verification_status, verified_by, verified_at
├── Banking: bank_account_number, bank_ifsc_code, bank_name
├── Documents: license_number, aadhar_number, certification
└── Experience: experience_years, total_produce_kg

-- Crop Listings
crops
├── Linked to: farmer_id (ManyToOne)
├── Details: crop_name, quantity_kg, price_per_kg
├── Quality: quality_data, soil_type, pesticides_used
├── Location: origin_location, harvest_date
├── Media: image_url, quality_certificate_url
├── Blockchain: blockchain_hash, blockchain_tx_hash
└── Timestamps: created_at, updated_at

-- Orders
orders
├── Participants: buyer_id, farmer_id, distributor_id
├── Product: crop_id, quantity, total_price
├── Delivery: delivery_address, delivery_fee
├── Status: status, blockchain_tx_hash
└── Timestamps: created_at, updated_at

-- Shipments
shipments
├── Reference: order_id (OneToOne)
├── Tracking: current_location, status
├── Conditions: temperature, humidity
├── Blockchain: blockchain_tx_hash
└── Updated: last_updated
```

#### Common Queries
```sql
-- List all crops available for purchase
SELECT c.*, f.farm_name, f.farm_location, u.name 
FROM crops c
JOIN farmers f ON c.farmer_id = f.id
JOIN users u ON f.user_id = u.id
WHERE c.quantity_kg > 0
AND c.created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY c.created_at DESC;

-- Get farmer's earnings
SELECT 
    u.name as farmer_name,
    COUNT(o.id) as total_orders,
    SUM(o.total_price) as total_earnings,
    AVG(o.total_price) as avg_order_value
FROM users u
JOIN farmers f ON u.id = f.user_id
LEFT JOIN orders o ON f.id = o.farmer_id
WHERE u.role = 'FARMER'
GROUP BY u.id
ORDER BY total_earnings DESC;

-- Get pending farmer verifications
SELECT 
    f.*,
    u.name, u.email, u.created_at
FROM farmers f
JOIN users u ON f.user_id = u.id
WHERE f.verification_status = 'PENDING'
ORDER BY u.created_at ASC;

-- Get orders by status for tracking
SELECT 
    o.*,
    u.name as buyer_name,
    c.crop_name,
    s.current_location,
    s.status as shipment_status
FROM orders o
JOIN users u ON o.buyer_id = u.id
JOIN crops c ON o.crop_id = c.id
LEFT JOIN shipments s ON o.id = s.order_id
WHERE o.status = 'SHIPPED'
ORDER BY s.last_updated DESC;

-- Platform statistics
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM users WHERE role = 'FARMER') as total_farmers,
    (SELECT COUNT(*) FROM orders) as total_orders,
    (SELECT SUM(total_price) FROM orders) as total_revenue,
    (SELECT COUNT(*) FROM crops) as total_crops
FROM DUAL;
```

---

### For DevOps/Deployment

#### Docker Deployment
```dockerfile
# Dockerfile for Backend
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/FarmXChain-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker build -t farmxchain-backend .
# docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mysql://host... farmxchain-backend
```

#### Environment Variables
```bash
# Backend (.env)
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/farmxchain_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-secret-key-change-in-production
BLOCKCHAIN_NODE_URL=http://localhost:7545
BLOCKCHAIN_PRIVATE_KEY=0x...

# Frontend (.env)
REACT_APP_API_URL=http://localhost:8080/api/v1
REACT_APP_ENV=development
```

#### Deployment Checklist
```
Pre-Deployment:
☐ Run all tests (unit, integration, E2E)
☐ Code review completed
☐ Security scan passed
☐ Performance testing done
☐ Database migrations tested
☐ Environment variables set
☐ SSL certificates configured

Deployment:
☐ Backup database
☐ Deploy backend
☐ Run database migrations
☐ Deploy frontend
☐ Health check endpoints
☐ Smoke tests

Post-Deployment:
☐ Monitor error logs
☐ Check performance metrics
☐ Verify all features working
☐ User notifications sent
☐ Rollback plan ready
```

---

## 🔧 Common Modifications

### Add a New User Role
```java
// 1. Add to Role enum
public enum Role {
    FARMER,
    DISTRIBUTOR,
    RETAILER,
    CONSUMER,
    ADMIN,
    SUPPLIER  // New role
}

// 2. Update SecurityConfig
.requestMatchers("/suppliers/**")
    .hasRole("SUPPLIER")

// 3. Add authorizations in controllers
@PreAuthorize("hasRole('SUPPLIER')")
public ResponseEntity<...> getSupplierData() { ... }
```

### Add a New Database Field
```java
// 1. Update Entity
@Column(name = "new_field")
private String newField;

// 2. Update DTO
private String newField;

// 3. Create migration (for production)
ALTER TABLE table_name ADD COLUMN new_field VARCHAR(255);

// 4. Update service/repository queries
```

### Add Email Notifications
```java
// 1. Add email service
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(order.getBuyer().getEmail());
        message.setSubject("Order Confirmed");
        message.setText("Your order has been confirmed...");
        mailSender.send(message);
    }
}

// 2. Call from order service
emailService.sendOrderConfirmation(order);
```

---

## 📚 Documentation Best Practices

```
For Each New Feature:
1. Update README.md with usage
2. Add API documentation (Swagger)
3. Create database schema diagram
4. Document business logic flow
5. Add code comments for complex logic
6. Create test cases documentation
7. Update deployment guide

Code Comments Example:
/**
 * Calculate total price for an order
 * 
 * @param quantity The quantity in kg
 * @param pricePerKg The price per kilogram
 * @return Total price (quantity × pricePerKg)
 * @throws IllegalArgumentException if quantity or price is negative
 * 
 * Example:
 * BigDecimal total = calculateTotalPrice(50, 100); // 5000
 */
public BigDecimal calculateTotalPrice(BigDecimal quantity, BigDecimal pricePerKg) {
    if (quantity.compareTo(BigDecimal.ZERO) < 0) {
        throw new IllegalArgumentException("Quantity cannot be negative");
    }
    return quantity.multiply(pricePerKg);
}
```

---

## 🧪 Testing Guide

```
Unit Testing (JUnit):
@Test
public void testLoginWithValidCredentials() {
    // Arrange
    LoginRequest request = new LoginRequest("admin@farmxchain.io", "Admin@123");
    
    // Act
    LoginResponse response = authService.login(request);
    
    // Assert
    assertNotNull(response.getToken());
    assertEquals("ADMIN", response.getUser().getRole());
}

Integration Testing (MockMvc):
@Test
public void testLoginEndpoint() throws Exception {
    mockMvc.perform(post("/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\"email\":\"admin@farmxchain.io\",\"password\":\"Admin@123\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.data.token").exists());
}

E2E Testing (Selenium/Cypress):
describe('Login Flow', () => {
    it('should login and redirect to dashboard', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[name="email"]').type('admin@farmxchain.io');
        cy.get('input[name="password"]').type('Admin@123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });
});
```

---

Generated: September 1, 2026  
Version: 1.0  
For Developers: Frontend | Backend | Database | DevOps

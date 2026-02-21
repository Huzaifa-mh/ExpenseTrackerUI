# 💰 Personal Expense Tracker 

A RESTful API built with ASP.NET Core for tracking personal expenses. Features include expense management, category-based organization, date filtering, and spending analytics.

![API Architecture](https://via.placeholder.com/800x300?text=API+Architecture+Diagram)

## 🔗 Links

- **Backend Repository**: [expense-tracker-ui](#) _(https://github.com/Huzaifa-mh/ExpenseTrackerAPI)_
- **Live API**: (#) _(https://jolly-flower-05e8c1900.4.azurestaticapps.net/)_
- **API Documentation**: Available via Swagger at `/swagger`

## ✨ Features

### 📊 Core Functionality
- **Expense Management** - Create, read, and delete expenses
- **Category System** - Pre-seeded expense categories with colors
- **Date Filtering** - Query expenses by custom date ranges
- **Spending Analytics** - Category-wise spending summaries
- **Monthly Trends** - Aggregated spending data by month

### 🔧 Technical Features
- **RESTful Architecture** - Clean, predictable API endpoints
- **Entity Framework Core** - Type-safe database operations
- **DTO Pattern** - Separation between database models and API contracts
- **CORS Enabled** - Ready for frontend integration
- **Swagger/OpenAPI** - Interactive API documentation
- **Async/Await** - Optimized for performance
- **SQL Server** - Robust relational database

## 🛠️ Tech Stack

- **Framework**: ASP.NET Core
- **Language**: C# 12
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Documentation**: Swagger/OpenAPI
- **Architecture**: RESTful API with Repository Pattern

## 📋 Prerequisites

- .NET 
- SQL Server (LocalDB, Express, or Developer Edition)
- Visual Studio 2022 or VS Code with C# extension

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Huzaifa-mh/ExpenseTrackerAPI.git
cd ExpenseTrackerAPI
```

### 2. Configure Database Connection

Update `appsettings.json` with your SQL Server connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ExpenseTracker;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3. Install Dependencies
```bash
dotnet restore
```

### 4. Apply Migrations
```bash
dotnet ef database update
```

This will:
- Create the `ExpenseTracker` database
- Create `Categories` and `Expenses` tables
- Seed 7 default categories

### 5. Run the API
```bash
dotnet run
```

API will be available at:
- HTTPS: `https://localhost:7026`
- HTTP: `http://localhost:5261`

### 6. View API Documentation

Navigate to `https://localhost:7026/swagger` to explore the interactive API documentation.

## 📁 Project Structure
```
ExpenseTrackerAPI/
├── Controllers/
│   ├── CategoriesController.cs   # Category endpoints
│   └── ExpensesController.cs     # Expense endpoints
├── Models/
│   ├── Category.cs               # Category entity
│   ├── Expense.cs                # Expense entity
│   └── DTOs/
│       ├── CreateExpenseDto.cs   # Input DTO
│       └── ExpenseResponseDto.cs # Output DTO (optional)
├── Data/
│   └── ExpenseDbContext.cs       # Database context
├── Migrations/                   # EF Core migrations
├── Program.cs                    # Application configuration
└── appsettings.json             # Configuration settings
```

## 🔌 API Endpoints

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses (with optional date filters) |
| GET | `/api/expenses/{id}` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/summary` | Get category-wise spending summary |
| GET | `/api/expenses/monthly-summary?months=6` | Get monthly spending trends |

## 📝 API Usage Examples

### Create Expense
```http
POST /api/expenses
Content-Type: application/json

{
  "amount": 50.99,
  "categoryId": 1,
  "date": "2024-01-26",
  "description": "Lunch at restaurant"
}
```

### Get Expenses with Date Filter
```http
GET /api/expenses?startDate=2024-01-01&endDate=2024-01-31
```

### Get Category Summary
```http
GET /api/expenses/summary
```

**Response:**
```json
[
  {
    "categoryId": 1,
    "categoryName": "Food & Dining",
    "categoryColor": "#FF6384",
    "totalAmount": 250.50,
    "expenseCount": 8
  }
]
```

## 🗄️ Database Schema

### Categories Table
```sql
Id (int, PK)
Name (nvarchar(50))
ColorCode (nvarchar(7))
```

### Expenses Table
```sql
Id (int, PK)
Amount (decimal(18,2))
CategoryId (int, FK)
Date (datetime)
Description (nvarchar(200))
CreatedAt (datetime)
```

## 🔐 CORS Configuration

CORS is enabled for the following origins:
- `http://localhost:5173` (Vite)
- `http://localhost:5174`
- `http://localhost:3000` (Create React App)

Update `Program.cs` to add additional origins if needed.

## 🎯 Key Features Explained

### DTO Pattern
Input and output DTOs separate concerns:
- **CreateExpenseDto**: What clients send (no ID, no CreatedAt)
- **ExpenseResponseDto**: What API returns (includes category details)

### Async/Await
All database operations use async methods for better performance:
```csharp
public async Task GetExpenses()
{
    var expenses = await _context.Expenses.ToListAsync();
    return Ok(expenses);
}
```

### Data Seeding
Default categories are automatically seeded on first migration:
- Food & Dining
- Transportation
- Entertainment
- Shopping
- Bills & Utilities
- Healthcare
- Other

## 🧪 Testing

### Using Swagger
1. Run the application
2. Navigate to `/swagger`
3. Expand endpoints and click "Try it out"
4. Test each endpoint interactively

### Using Postman
Import the Swagger JSON to generate a Postman collection:
```
https://localhost:7026/swagger/v1/swagger.json
```

## 🔧 Development Commands
```bash
# Restore packages
dotnet restore

# Build project
dotnet build

# Run application
dotnet run

# Create new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

## 🚀 Deployment

### Azure App Service
1. Publish using Visual Studio or CLI
2. Update connection string in Azure portal
3. Enable CORS for your frontend domain

### Railway
1. Connect GitHub repository
2. Add SQL Server connection string as environment variable
3. Railway will auto-deploy on push

## 📊 Performance Considerations

- All queries use `.AsNoTracking()` where appropriate
- Includes are explicit to avoid N+1 queries
- Async operations prevent thread blocking
- Pagination recommended for large datasets (future enhancement)

## 🐛 Troubleshooting

### Migration Issues
```bash
# Reset database
dotnet ef database drop
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### CORS Errors
Verify frontend origin is in the CORS policy in `Program.cs`

## 🚀 Future Enhancements

- [ ] Update expense functionality
- [ ] Pagination for large datasets
- [ ] User authentication with JWT
- [ ] Soft delete for expenses
- [ ] Expense attachments/receipts
- [ ] Budget management endpoints
- [ ] Recurring expenses


## 👨‍💻 Author

**Muhammad Huzaifa**

- GitHub: [@Huzaifa-mh](https://github.com/Huzaifa-mh)
- LinkedIn: [Muhammad Huzaifa](https://www.linkedin.com/in/muhammadhuzaifamh)

---

⭐ Star this repository if you find it helpful!

🔗 GitHub (Backend): https://github.com/Huzaifa-mh/ExpenseTrackerAPI
🔗 GitHub (Frontend): [https://github.com/Huzaifa-mh/ExpenseTrackerUI]
🔗 Live Demo: [https://jolly-flower-05e8c1900.4.azurestaticapps.net/]
```




```markdown
# CircuitForge — Local Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/MahdiRedwan/E-commerce.git
cd E-commerce
```

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
RESENDKEY=your_resend_api_key
JWT_SECRET=your_jwt_secret
```

---

## Step 4: Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Copy your Project URL and Anon Key
4. Paste them in `.env.local`

### Create Database Tables

Go to **SQL Editor** in Supabase and run:

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT,
  subcategories JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category_slug TEXT REFERENCES categories(slug),
  subcategory TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  image TEXT,
  rating DECIMAL(3,2),
  review_count INTEGER,
  in_stock BOOLEAN DEFAULT TRUE,
  badge TEXT,
  specs JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  payment_method TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cart table
CREATE TABLE carts (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  items JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscribers table
CREATE TABLE subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Business accounts table
CREATE TABLE business_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  company_name TEXT NOT NULL,
  tax_id TEXT,
  vat_number TEXT,
  address TEXT,
  phone TEXT,
  website TEXT,
  business_type TEXT DEFAULT 'retail',
  estimated_monthly_order TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Step 5: Set Up Stripe

1. Go to [Stripe](https://stripe.com) and create a free account
2. Go to **Developers → API Keys**
3. Copy your Publishable Key and Secret Key
4. Paste them in `.env.local`

---

## Step 6: Set Up Resend (for Email)

1. Go to [Resend](https://resend.com) and create a free account
2. Get your API key
3. Paste it in `.env.local` as `RESENDKEY`

---

## Step 7: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 8: Seed Initial Data (Optional)

Run this in Supabase SQL Editor to add sample products:

```sql
INSERT INTO categories (slug, label, subcategories) VALUES
  ('desktop', 'Desktop', '["Prebuilt PCs","Mini PCs","Workstations"]'),
  ('laptop', 'Laptop', '["Gaming Laptops","Ultrabooks","Business Laptops"]'),
  ('component', 'Component', '["CPU","GPU","Motherboard","RAM","Storage","PSU","Case","Cooling"]'),
  ('monitor', 'Monitor', '["Gaming Monitors","4K Monitors","Ultrawide"]'),
  ('networking', 'Networking', '["Routers","Switches","Wi-Fi Systems"]');
```

---

## Default Test Accounts (After Setup)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@circuitforge.com | admin123 |
| Customer | testlogin@example.com | test123 |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Supabase connection error | Check your `.env.local` keys |
| Stripe payment fails | Use test card: `4242 4242 4242 4242` |
| Email not sending | Check Resend API key |

---

## Need Help?

Open an issue on GitHub: https://github.com/MahdiRedwan/E-commerce/issues
```

---

## Step 3: Save (Ctrl + S)

---

## Step 4: Push

```bash
git add .
git commit -m "Add SETUP.md for local installation guide"
git push origin main
```

---

**Tell me when it's pushed.** 🚀
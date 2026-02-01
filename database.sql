-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS paymob_store;
USE paymob_store;

-- جدول الطلبات
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    apartment VARCHAR(50),
    floor VARCHAR(50),
    street TEXT,
    building TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    status ENUM('pending', 'paid', 'failed', 'cancelled') DEFAULT 'pending',
    paymob_order_id VARCHAR(255),
    paymob_transaction_id VARCHAR(255),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول المنتجات (اختياري)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    description TEXT,
    image_url VARCHAR(500)
);

-- إدراج بيانات اختبارية
INSERT INTO products (name, price, description) VALUES
('لابتوب ديل', 15000.00, 'لابتوب ديل بكامل المواصفات'),
('هاتف سامسونج', 8000.00, 'هاتف سامسونج أندرويد'),
('سماعات بلوتوث', 500.00, 'سماعات لاسلكية عالية الجودة');
<?php
// config.php

// إعدادات Paymob
define('PAYMOB_API_KEY', 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RjNE56Y3dMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuU2VzUzNYd1dCcjl6dlB0NGN2T2pZUFc1M09VckpIV1J2bWFtNE8xWVRSeFZkZTFqOGtOY05ZbHJETlJDaU9tOHhkRWFjU3dIUm12eGswd2F3RW9HN3c=');
define('PAYMOB_INTEGRATION_ID', '123456'); // استبدله بـ Integration ID الخاص بك
define('PAYMOB_IFRAME_ID', '456789'); // استبدله بـ Iframe ID الخاص بك
define('PAYMOB_HMAC_SECRET', 'your_hmac_secret_here'); // إذا كان مفعل

// إعدادات قاعدة البيانات
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'paymob_store');

// إعدادات الموقع
define('SITE_URL', 'http://localhost/paymob-project');
define('CURRENCY', 'EGP');

// بدء الجلسة
session_start();

// الاتصال بقاعدة البيانات
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// دالة التحقق من التوكن
function verifyCSRFToken() {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die('CSRF token validation failed');
    }
}

// إنشاء توكن CSRF
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
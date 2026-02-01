<?php
// checkout.php
session_start();

// إعدادات Paymob (ضع المفاتيح الخاصة بك هنا)
define('PAYMOB_API_KEY', 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RjNE56Y3dMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuU2VzUzNYd1dCcjl6dlB0NGN2T2pZUFc1M09VckpIV1J2bWFtNE8xWVRSeFZkZTFqOGtOY05ZbHJETlJDaU9tOHhkRWFjU3dIUm12eGswd2F3RW9HN3c=');
define('PAYMOB_INTEGRATION_ID', '123456'); // استبدله بـ Integration ID الخاص بك
define('PAYMOB_IFRAME_ID', '456789'); // استبدله بـ Iframe ID الخاص بك
define('PAYMOB_HMAC_SECRET', 'your_hmac_secret_here'); // إذا كان مفعل

// تحقق من أن الطلب من نوع POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('طريقة الطلب غير صالحة');
}

// جمع البيانات من النموذج
$first_name = filter_input(INPUT_POST, 'first_name', FILTER_SANITIZE_STRING);
$last_name = filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$street = filter_input(INPUT_POST, 'street', FILTER_SANITIZE_STRING);
$building = filter_input(INPUT_POST, 'building', FILTER_SANITIZE_STRING);
$city = filter_input(INPUT_POST, 'city', FILTER_SANITIZE_STRING);
$country = filter_input(INPUT_POST, 'country', FILTER_SANITIZE_STRING);
$amount = filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
$currency = filter_input(INPUT_POST, 'currency', FILTER_SANITIZE_STRING);
$items = json_decode($_POST['items'], true);

// التحقق من البيانات المطلوبة
if (!$first_name || !$last_name || !$email || !$phone || !$amount) {
    die('بيانات غير مكتملة');
}

// 1. الحصول على auth token من Paymob
function getAuthToken() {
    $ch = curl_init('https://accept.paymobsolutions.com/api/auth/tokens');
    
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode([
            'api_key' => PAYMOB_API_KEY
        ]),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json'
        ]
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 201) {
        return null;
    }
    
    $data = json_decode($response, true);
    return $data['token'] ?? null;
}

// 2. إنشاء order في Paymob
function createPaymobOrder($authToken, $amount, $currency) {
    $ch = curl_init('https://accept.paymobsolutions.com/api/ecommerce/orders');
    
    $data = [
        'auth_token' => $authToken,
        'delivery_needed' => 'false',
        'amount_cents' => $amount * 100, // تحويل إلى قروش
        'currency' => $currency,
        'items' => []
    ];
    
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $authToken
        ]
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 201) {
        return null;
    }
    
    $result = json_decode($response, true);
    return $result['id'] ?? null;
}

// 3. الحصول على payment key
function getPaymentKey($authToken, $orderId, $customerData, $amount, $currency) {
    $billingData = [
        "apartment" => "NA",
        "email" => $customerData['email'],
        "floor" => "NA",
        "first_name" => $customerData['first_name'],
        "street" => $customerData['street'] ?? "NA",
        "building" => $customerData['building'] ?? "NA",
        "phone_number" => $customerData['phone'],
        "shipping_method" => "PKG",
        "postal_code" => "NA",
        "city" => $customerData['city'] ?? "NA",
        "country" => $customerData['country'] ?? "مصر",
        "last_name" => $customerData['last_name'],
        "state" => "NA"
    ];
    
    $data = [
        'auth_token' => $authToken,
        'amount_cents' => $amount * 100,
        'expiration' => 3600,
        'order_id' => $orderId,
        'billing_data' => $billingData,
        'currency' => $currency,
        'integration_id' => PAYMOB_INTEGRATION_ID,
        'lock_order_when_paid' => "false"
    ];
    
    $ch = curl_init('https://accept.paymobsolutions.com/api/acceptance/payment_keys');
    
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $authToken
        ]
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 201) {
        return null;
    }
    
    $result = json_decode($response, true);
    return $result['token'] ?? null;
}

try {
    // الحصول على auth token
    $authToken = getAuthToken();
    if (!$authToken) {
        throw new Exception('فشل في الحصول على رمز المصادقة');
    }
    
    // إنشاء order في Paymob
    $paymobOrderId = createPaymobOrder($authToken, $amount, $currency);
    if (!$paymobOrderId) {
        throw new Exception('فشل في إنشاء الطلب');
    }
    
    // تجهيز بيانات العميل
    $customerData = [
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'phone' => $phone,
        'street' => $street,
        'building' => $building,
        'city' => $city,
        'country' => $country
    ];
    
    // الحصول على payment key
    $paymentKey = getPaymentKey($authToken, $paymobOrderId, $customerData, $amount, $currency);
    if (!$paymentKey) {
        throw new Exception('فشل في الحصول على مفتاح الدفع');
    }
    
    // إنشاء رابط iframe
    $iframeUrl = "https://accept.paymobsolutions.com/api/acceptance/iframes/" 
                . PAYMOB_IFRAME_ID 
                . "?payment_token=" . $paymentKey;
    
    // حفظ بيانات الطلب في الجلسة
    $_SESSION['order_data'] = [
        'paymob_order_id' => $paymobOrderId,
        'customer' => $customerData,
        'amount' => $amount,
        'currency' => $currency,
        'items' => $items,
        'status' => 'pending'
    ];
    
    // إعادة توجيه إلى iframe الدفع
    header('Location: ' . $iframeUrl);
    exit;
    
} catch (Exception $e) {
    echo '<!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>خطأ في الدفع</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                text-align: center;
                padding: 50px;
                direction: rtl;
            }
            .error-container {
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                max-width: 500px;
                margin: 0 auto;
            }
            .error-icon {
                color: #dc3545;
                font-size: 4rem;
                margin-bottom: 20px;
            }
            h1 {
                color: #dc3545;
                margin-bottom: 20px;
            }
            p {
                margin-bottom: 30px;
                color: #666;
            }
            .back-btn {
                background-color: #1a5f7a;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 5px;
                font-size: 1.1rem;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h1>حدث خطأ أثناء معالجة الدفع</h1>
            <p>' . $e->getMessage() . '</p>
            <a href="cart.html" class="back-btn">العودة إلى عربة التسوق</a>
        </div>
    </body>
    </html>';
}
?>
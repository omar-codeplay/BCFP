# مركز الكتاب للنشر - نظام الدفع عبر Paymob

## الملفات المطلوبة

1. **`index.html`** - الصفحة الرئيسية (لديك بالفعل)
2. **`cart.html`** - صفحة عربة التسوق
3. **`checkout.html`** - صفحة إتمام الشراء
4. **`checkout.php`** - معالجة الدفع مع Paymob
5. **`callback.php`** - معالجة استجابة Paymob
6. **`orders.html`** - صفحة الطلبات السابقة
7. **`success.html`** - صفحة نجاح الدفع
8. **`failed.html`** - صفحة فشل الدفع
9. **`.htaccess`** - إعدادات الخادم
10. **`netlify.toml`** - إعدادات Netlify

## التثبيت

### 1. إعداد Paymob
1. سجل في [Paymob](https://www.paymob.com/)
2. احصل على:
   - API Key
   - Integration ID للبطاقات
   - Iframe ID
   - HMAC Secret (اختياري)

### 2. تعديل الإعدادات
افتح `checkout.php` وقم بتعديل:
```php
define('PAYMOB_API_KEY', 'مفتاح_API_الخاص_بك');
define('PAYMOB_INTEGRATION_ID', 'رقم_التكامل_الخاص_بك');
define('PAYMOB_IFRAME_ID', 'رقم_الإنفريم_الخاص_بك');
define('PAYMOB_HMAC_SECRET', 'مفتاح_HMAC_الخاص_بك');
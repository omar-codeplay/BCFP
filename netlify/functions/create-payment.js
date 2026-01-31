const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'الطريقة غير مسموحة' })
    };
  }

  try {
    const { order, amount, currency } = JSON.parse(event.body);
    
    // التحقق من بيانات Paymob (تستبدل بمعلوماتك الحقيقية)
    const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
    const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID;
    const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID;
    
    if (!PAYMOB_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false,
          error: 'لم يتم تكوين مفتاح Paymob API' 
        })
      };
    }
    
    // محاكاة استجابة Paymob (في التطبيق الحقيقي استخدم الـ API الحقيقي)
    const mockPaymentData = {
      success: true,
      iframeUrl: `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=mock_token_${order.orderId}`,
      orderId: order.orderId,
      paymobOrderId: Date.now(),
      paymentToken: `mock_token_${order.orderId}`
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(mockPaymentData)
    };
    
  } catch (error) {
    console.error('Payment creation error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'حدث خطأ في إنشاء رابط الدفع'
      })
    };
  }
};
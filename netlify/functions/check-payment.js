const axios = require('axios');

exports.handler = async function(event, context) {
  const { orderId } = event.queryStringParameters;
  
  if (!orderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'رقم الطلب مطلوب' })
    };
  }
  
  try {
    // في تطبيق حقيقي، هنا ستتحقق من حالة الدفع في Paymob
    // أو تحتفظ بحالة الدفع في قاعدة بياناتك
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        orderId: orderId,
        paid: false, // في التطبيق الحقيقي، تحقق من قاعدة البيانات
        status: 'pending'
      })
    };
    
  } catch (error) {
    console.error('Payment check error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'حدث خطأ في التحقق من حالة الدفع'
      })
    };
  }
};
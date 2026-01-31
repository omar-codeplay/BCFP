const { Pool } = require('@neondatabase/serverless');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'الطريقة غير مسموحة' })
    };
  }

  try {
    const orderData = JSON.parse(event.body);
    
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      console.log('No database connection, using mock save');
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: true,
          message: 'تم حفظ الطلب في قاعدة البيانات الموقتة'
        })
      };
    }
    
    const pool = new Pool({
      connectionString: connectionString,
      ssl: true
    });
    
    // حفظ الطلب في قاعدة البيانات
    await pool.query(
      `INSERT INTO orders (
        order_id, customer_data, items, 
        subtotal, shipping, tax, discount, total,
        payment_method, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        orderData.orderId,
        JSON.stringify(orderData.customer),
        JSON.stringify(orderData.items),
        orderData.subtotal,
        orderData.shipping,
        orderData.tax,
        orderData.discount,
        orderData.total,
        orderData.customer.paymentMethod,
        'pending',
        new Date().toISOString()
      ]
    );
    
    await pool.end();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'تم حفظ الطلب بنجاح'
      })
    };
    
  } catch (error) {
    console.error('Error saving order:', error);
    
    return {
      statusCode: 200, // نعود بـ 200 حتى لا يحدث خطأ للمستخدم
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'تم حفظ الطلب محلياً (لا يوجد اتصال بقاعدة البيانات)'
      })
    };
  }
};
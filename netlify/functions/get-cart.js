const { Pool } = require('@neondatabase/serverless');

exports.handler = async function(event, context) {
  // التحقق من المصادقة
  if (!context.clientContext || !context.clientContext.user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        error: 'يجب تسجيل الدخول',
        items: [] 
      })
    };
  }
  
  const user = context.clientContext.user;
  const userId = user.sub;
  
  console.log(`Fetching cart for user: ${userId}`);
  
  try {
    // استخدام رابط قاعدة بيانات من متغير البيئة
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      console.error('DATABASE_URL environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'خطأ في إعداد قاعدة البيانات',
          items: [] 
        })
      };
    }
    
    const pool = new Pool({
      connectionString: connectionString,
      ssl: { rejectUnauthorized: false }
    });
    
    // استخدام جدول بسيط أو تحقق من وجوده
    const query = `
      SELECT 
        ci.id,
        ci.book_id,
        ci.quantity,
        ci.created_at,
        b.title,
        b.author,
        b.price,
        b.image_url
      FROM cart_items ci
      LEFT JOIN books b ON ci.book_id = b.id
      WHERE ci.user_id = $1
      ORDER BY ci.created_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    await pool.end();
    
    const items = result.rows.map(row => ({
      id: row.book_id,
      title: row.title || 'كتاب غير معروف',
      author: row.author || 'مؤلف غير معروف',
      price: parseFloat(row.price) || 0,
      image: row.image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      quantity: row.quantity || 1
    }));
    
    console.log(`Found ${items.length} items in cart`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ items })
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    
    // إرجاع قائمة فارغة في حالة حدوث خطأ
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        items: [],
        error: 'خطأ في جلب البيانات' 
      })
    };
  }
};
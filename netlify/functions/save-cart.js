const { Pool } = require('@neondatabase/serverless');

exports.handler = async function(event, context) {
  // التحقق من المصادقة
  if (!context.clientContext || !context.clientContext.user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'يجب تسجيل الدخول' })
    };
  }
  
  // التحقق من طريقة الطلب
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'الطريقة غير مسموحة' })
    };
  }
  
  const user = context.clientContext.user;
  const userId = user.sub;
  
  console.log(`Saving cart for user: ${userId}`);
  
  try {
    const { items } = JSON.parse(event.body);
    
    if (!Array.isArray(items)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'تنسيق بيانات غير صحيح' })
      };
    }
    
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      console.error('DATABASE_URL environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'خطأ في إعداد قاعدة البيانات' })
      };
    }
    
    const pool = new Pool({
      connectionString: connectionString,
      ssl: { rejectUnauthorized: false }
    });
    
    // بدء المعاملة
    await pool.query('BEGIN');
    
    try {
      // حذف العناصر القديمة
      await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
      
      // إضافة العناصر الجديدة
      for (const item of items) {
        if (item.id && item.quantity > 0) {
          // التحقق من وجود الكتاب في قاعدة البيانات
          const bookCheck = await pool.query(
            'SELECT id FROM books WHERE id = $1',
            [item.id]
          );
          
          if (bookCheck.rows.length === 0) {
            console.warn(`Book ID ${item.id} not found, inserting placeholder`);
            
            // إضافة كتاب افتراضي إذا لم يكن موجوداً
            await pool.query(
              `INSERT INTO books (id, title, author, price, image_url) 
               VALUES ($1, $2, $3, $4, $5)
               ON CONFLICT (id) DO NOTHING`,
              [
                item.id,
                item.title || 'كتاب غير معروف',
                item.author || 'مؤلف غير معروف',
                item.price || 0,
                item.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
              ]
            );
          }
          
          // إضافة العنصر إلى العربة
          await pool.query(
            `INSERT INTO cart_items (user_id, book_id, quantity) 
             VALUES ($1, $2, $3)`,
            [userId, item.id, item.quantity]
          );
        }
      }
      
      await pool.query('COMMIT');
      await pool.end();
      
      console.log(`Saved ${items.length} items to cart`);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          message: 'تم حفظ العربة بنجاح',
          count: items.length 
        })
      };
    } catch (error) {
      await pool.query('ROLLBACK');
      await pool.end();
      throw error;
    }
  } catch (error) {
    console.error('Error saving cart:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'حدث خطأ في حفظ العربة',
        details: error.message 
      })
    };
  }
};
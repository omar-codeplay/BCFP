// functions/payment.js
exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const data = JSON.parse(event.body);
        
        // هنا يمكنك إضافة منطق الدفع
        // هذا مثال بسيط للاستجابة
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'تم استلام طلب الدفع',
                data: data
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
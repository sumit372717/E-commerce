import { Resend } from 'resend';

// Use the environment variable name you added in Vercel
const resend = new Resend(process.env.RESENDKEY);

export async function sendOrderConfirmation(order: any, userEmail: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'CircuitForge <onboarding@resend.dev>',
      to: [userEmail],
      subject: `Order Confirmation #${order.id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; border-bottom: 2px solid #E3A24C; padding-bottom: 20px; margin-bottom: 20px;">
              <h1 style="color: #E3A24C; margin: 0; font-size: 28px;">CircuitForge</h1>
              <p style="color: #666; margin: 5px 0 0;">Order Confirmation</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #333;">
                <strong>Order #${order.id}</strong>
              </p>
              <p style="margin: 5px 0 0; font-size: 14px; color: #666;">
                ${new Date(order.created_at).toLocaleDateString()} at ${new Date(order.created_at).toLocaleTimeString()}
              </p>
            </div>

            <h2 style="color: #333; font-size: 18px; margin: 20px 0 10px;">Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 10px; text-align: left; font-size: 14px; color: #666;">Item</th>
                  <th style="padding: 10px; text-align: center; font-size: 14px; color: #666;">Qty</th>
                  <th style="padding: 10px; text-align: right; font-size: 14px; color: #666;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item: any) => `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; color: #333;">${item.name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center; font-size: 14px; color: #333;">${item.quantity}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-size: 14px; color: #333;">৳${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="border-top: 2px solid #E3A24C; padding-top: 15px; text-align: right; margin-bottom: 20px;">
              <p style="margin: 5px 0; font-size: 14px; color: #666;">Subtotal: ৳${order.total.toFixed(2)}</p>
              <p style="margin: 5px 0; font-size: 14px; color: #666;">Shipping: Calculated at checkout</p>
              <p style="margin: 10px 0 0; font-size: 20px; font-weight: bold; color: #E3A24C;">Total: ৳${order.total.toFixed(2)}</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #333; font-size: 14px; margin: 0 0 5px;">Shipping Address</h3>
              <p style="margin: 0; font-size: 14px; color: #666;">
                ${order.shipping_address.street}<br>
                ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.zip}<br>
                ${order.shipping_address.country}
              </p>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999; margin: 0;">
                Thank you for shopping with CircuitForge!
              </p>
              <p style="font-size: 12px; color: #999; margin: 5px 0 0;">
                <a href="https://e-commerce-tan-one-94.vercel.app/track-order" style="color: #E3A24C; text-decoration: none;">Track your order</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error };
  }
}
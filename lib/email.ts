export async function sendOrderConfirmation(orderData: any) {
  console.log("Sending order confirmation email:", orderData);
  return { success: true };
}
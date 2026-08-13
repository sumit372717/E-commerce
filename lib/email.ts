export async function sendOrderConfirmation(orderData: any, email?: string) {
  console.log("Sending confirmation email to:", email, orderData);
  // Your email sending logic here
  return { success: true };
}
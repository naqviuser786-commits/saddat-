import { Product, QuoteCartItem } from "../types";
import { SITE_CONFIG } from "../data/furnitureData";

// Base WhatsApp URL Generator
export const createWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
};

// 1. General Quick Inquiry Link (Header & Floating button ke liye)
export const getGeneralWhatsAppUrl = (): string => {
  const message = `Assalam-o-Alaikum Saddat Office Furniture,
I am interested in your office furniture collection and corporate workspace solutions. Please share your latest catalog and corporate pricing list.`;
  return createWhatsAppUrl(message);
};

// 2. Single Product Direct Inquiry Link (Product Card / Product Detail ke liye)
export const getProductWhatsAppUrl = (product: Product, quantity: number = 1): string => {
  const message = `Assalam-o-Alaikum Saddat Office Furniture,
I would like to inquire about the following product:

• Product: ${product.name}
• SKU: ${product.sku}
• Unit Price: PKR ${product.price.toLocaleString()}
• Quantity Required: ${quantity} units
• Category: ${product.categoryName}

Please confirm availability, bulk discount eligibility, and delivery timeline.`;
  return createWhatsAppUrl(message);
};

// 3. Complete Cart / Multiple Products Quotation Link
export const getCartQuoteWhatsAppUrl = (
  items: QuoteCartItem[],
  totalPrice: number,
  customerName?: string,
  companyName?: string
): string => {
  let itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku}) - Qty: ${
          item.quantity
        } x PKR ${item.product.price.toLocaleString()} | Color: ${
          item.selectedColor || "Standard"
        }`
    )
    .join("\n");

  const message = `*OFFICIAL QUOTATION REQUEST - SADDAT OFFICE FURNITURE*
---------------------------------------
${customerName ? `Client Name: ${customerName}` : ""}
${companyName ? `Company: ${companyName}` : ""}

*Selected Items:*
${itemsList}

*Estimated Total:* PKR ${totalPrice.toLocaleString()}
---------------------------------------
Please provide an official corporate quotation invoice including delivery and installation details.`;

  return createWhatsAppUrl(message);
};
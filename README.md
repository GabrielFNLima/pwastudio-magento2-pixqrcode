# PWA Studio (Venia) - Pix QrCode Payment Method

This PWA Studio extension provides integration with payment method Pix QrCode for PWA Studio (Venia).

## Requirements

-   [Pix QrCode GraphQL](https://github.com/GabrielFNLima/magento2-pixqrcode-graphql) module for support GraphQL queries.
-   PWA Studio (Venia)

## Installation

Install the package via npm with the following command:

```bash
npm install @devgfnl/pwastudio-magento2-pixqrcode
```

### Overrides

This extension overrides the following components in PWA Studio (Venia):

-   @magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.js
-   @magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/orderDetails.js

/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
module.exports = componentOverride = {
    ['@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.js']:
        '@devgfnl/pwastudio-magento2-pixqrcode/lib/overrides/CheckoutPage/OrderConfirmationPage/orderConfirmationPage.js',
    ['@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/orderDetails.js']:
        '@devgfnl/pwastudio-magento2-pixqrcode/lib/overrides/OrderHistoryPage/OrderDetails/orderDetails.js'
};

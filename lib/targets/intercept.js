const componentOverrideMapping = require('./componentOverrideMapping');
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

module.exports = targets => {
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        flags[targets.name] = {
            cssModules: true,
            esModules: true,
            graphqlQueries: true,
            i18n: true
        };
    });

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });

    targets.of('@magento/venia-ui').checkoutPagePaymentTypes.tap(payments =>
        payments.add({
            paymentCode: 'gfnl_pixqrcode',
            importPath:
                '@devgfnl/pwastudio-magento2-pixqrcode/lib/components/PixQRCode'
        })
    );

    targets.of('@magento/venia-ui').editablePaymentTypes.tap(payments =>
        payments.add({
            paymentCode: 'gfnl_pixqrcode',
            importPath:
                '@devgfnl/pwastudio-magento2-pixqrcode/lib/components/Edit'
        })
    );

    targets.of('@magento/venia-ui').summaryPagePaymentTypes.tap(payments =>
        payments.add({
            paymentCode: 'gfnl_pixqrcode',
            importPath:
                '@devgfnl/pwastudio-magento2-pixqrcode/lib/components/Summary'
        })
    );
};

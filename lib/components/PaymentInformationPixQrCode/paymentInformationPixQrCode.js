import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { shape, string } from 'prop-types';

import { usePaymentInformationPixQrCode } from '../../talons/PaymentInformationPixQrCode/usePaymentInformationPixQrCode';

import defaultClasses from './paymentInformationPixQrCode.module.css';

const PaymentInformationPixQrCode = props => {
    const { orderNumber } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const { formatMessage, locale } = useIntl();

    const {
        payloadPix,
        qrcode,
        loading,
        typeOfProofPayment,
        email,
        whatsappNumber,
        error,
        isCopied,
        handleCopy
    } = usePaymentInformationPixQrCode({
        orderNumber
    });

    if (
        error ||
        payloadPix === '' ||
        payloadPix === null ||
        qrcode === '' ||
        qrcode === null
    ) {
        return null;
    }

    let instructionsText = '';

    if (typeOfProofPayment === 'by_whatsapp') {
        instructionsText =
            locale === 'pt-BR'
                ? `Após efetuar o pagamento, por favor, nos envie o comprovante pelo número de WhatsApp <a href='https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Segue o comprovante para o pedido: ${orderNumber}' target='_blank'>${whatsappNumber}</a>.`
                : `After making the payment, please send us the proof via WhatsApp at the number <a href='https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Here is the proof of payment for order: ${orderNumber}' target='_blank'>${whatsappNumber}</a>. `;
    }
    if (typeOfProofPayment === 'by_email') {
        instructionsText =
            locale === 'pt-BR'
                ? `Após realizar o pagamento, por favor envie seu comprovante para o email: <a href="mailto:${email}?subject=Comprovante de pagamento para o pedido: ${orderNumber}">${email}</a>, juntamente com o número do seu pedido: #${orderNumber}.`
                : `After making the payment, please send your receipt to the email: <a href="mailto:${email}?subject=Here is the proof of payment for order: ${orderNumber}">${email}</a>, along with your order number: #${orderNumber}.`;
    }

    return (
        <div className={classes.root}>
            <div
                data-cy="paymentInformationPixQrCode-paymentMethodHeading"
                className={classes.paymentMethodHeading}
            >
                <span>
                    <FormattedMessage
                        id="paymentInformationPixQrCode.paymentMethod"
                        defaultMessage="Payment Method"
                    />
                </span>
            </div>
            {loading ? (
                <LoadingIndicator classes={{ root: classes.loading }} />
            ) : (
                <div className={classes.paymentInformation}>
                    <img src={qrcode} alt="qrcode" />
                    <strong>
                        <FormattedMessage
                            id="paymentInformationPixQrCode.scanQrCode"
                            defaultMessage="Scan the QR code with your phone or copy and paste the code."
                        />
                    </strong>
                    <p>
                        <FormattedMessage
                            id="paymentInformationPixQrCode.openInApp"
                            defaultMessage="Open your bank's app on your phone, choose Pix, and point the camera at the QR code."
                        />
                    </p>
                    <div className={classes.paymentInformationDigitableLine}>
                        <strong>
                            <FormattedMessage
                                id="paymentInformationPixQrCode.digitableLine"
                                defaultMessage="Digitable Line"
                            />
                        </strong>
                        <textarea readOnly value={payloadPix} />
                        <Button
                            type="button"
                            priority="normal"
                            onClick={() => handleCopy(payloadPix)}
                        >
                            {isCopied ? (
                                <FormattedMessage
                                    id="paymentInformationPixQrCode.copied"
                                    defaultMessage="Copied!"
                                />
                            ) : (
                                <FormattedMessage
                                    id="paymentInformationPixQrCode.copy"
                                    defaultMessage="Copy"
                                />
                            )}
                        </Button>
                    </div>
                    {(email || whatsappNumber) && typeOfProofPayment && (
                        <div className={classes.paymentInformationInstructions}>
                            <strong>
                                <FormattedMessage
                                    id="paymentInformationPixQrCode.instructionsTitle"
                                    defaultMessage="Instructions after payment is paid"
                                />
                            </strong>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: instructionsText
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

PaymentInformationPixQrCode.propTypes = {
    classes: shape({ root: string })
};
PaymentInformationPixQrCode.defaultProps = {};
export default PaymentInformationPixQrCode;

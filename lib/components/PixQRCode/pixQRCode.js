import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import BillingAddress from '@magento/venia-ui/lib/components/CheckoutPage/BillingAddress';

import { usePixQRCode } from '../../talons/PixQRCode/usePixQRCode';
import defaultClasses from './pixQRCode.module.css';
import { FormattedMessage } from 'react-intl';

/**
 * The PixQRCode component renders all information to handle pixqrcode payment.
 *
 * @param {Boolean} props.shouldSubmit boolean value which represents if a payment nonce request has been submitted
 * @param {Function} props.onPaymentSuccess callback to invoke when the a payment nonce has been generated
 * @param {Function} props.onPaymentReady callback to invoke when the component is ready
 * @param {Function} props.onPaymentError callback to invoke when component throws an error
 * @param {Function} props.resetShouldSubmit callback to reset the shouldSubmit flag
 */

const PixQRCode = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        comment,
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    } = usePixQRCode(props);

    return (
        <div className={classes.root}>
            <p className={classes.comment}>{comment}</p>
            <BillingAddress
                resetShouldSubmit={props.resetShouldSubmit}
                shouldSubmit={props.shouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </div>
    );
};

PixQRCode.propTypes = {
    classes: shape({ root: string })
};
PixQRCode.defaultProps = {};
export default PixQRCode;

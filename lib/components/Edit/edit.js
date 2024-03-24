import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';

import PixQRCode from '../PixQRCode/pixQRCode';
import defaultClasses from './edit.module.css';

/**
 * The edit view for the PixQRCode payment method.
 */
const Edit = props => {
    const {
        onPaymentReady,
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit,
        shouldSubmit
    } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <PixQRCode
                onPaymentReady={onPaymentReady}
                onPaymentSuccess={onPaymentSuccess}
                onPaymentError={onPaymentError}
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={shouldSubmit}
            />
        </div>
    );
};

Edit.propTypes = {
    classes: shape({ root: string })
};
Edit.defaultProps = {};
export default Edit;

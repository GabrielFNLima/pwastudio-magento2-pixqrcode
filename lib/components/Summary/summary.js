import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Edit2 as EditIcon } from 'react-feather';

import Icon from '@magento/venia-ui/lib/components/Icon';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

import defaultClasses from './summary.module.css';

/**
 * The Summary component of the PixQRCode payment method extension.
 */
const Summary = props => {
    const { onEdit } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <div className={classes.root}>
            <div className={classes.heading_container}>
                <h5 className={classes.heading}>
                    <FormattedMessage
                        id={'checkoutPage.paymentInformation'}
                        defaultMessage={'Payment Information'}
                    />
                </h5>
                <LinkButton
                    className={classes.edit_button}
                    onClick={onEdit}
                    type="button"
                >
                    <Icon
                        size={16}
                        src={EditIcon}
                        classes={{ icon: classes.edit_icon }}
                    />
                    <span className={classes.edit_text}>
                        <FormattedMessage
                            id={'global.editButton'}
                            defaultMessage={'Edit'}
                        />
                    </span>
                </LinkButton>
            </div>
            <div className={classes.checkmo_details_container}>
                <span className={classes.payment_type}>
                    <FormattedMessage
                        id={'pixQrCode.paymentType'}
                        defaultMessage={'Pix'}
                    />
                </span>
            </div>
        </div>
    );
};

Summary.propTypes = {
    classes: shape({ root: string })
};
Summary.defaultProps = {};
export default Summary;

import { useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

import DEFAULT_OPERATIONS from './pixqrcode.gql';

/**
 * Talon to handle pixqrcode payment.
 *
 * @param {Boolean} props.shouldSubmit boolean value which represents if a payment nonce request has been submitted
 * @param {Function} props.onPaymentSuccess callback to invoke when the a payment nonce has been generated
 * @param {Function} props.onPaymentError callback to invoke when component throws an error
 * @param {Function} props.resetShouldSubmit callback to reset the shouldSubmit flag
 * @param {DocumentNode} props.operations.getPixQRCodeConfigQuery query to fetch config from backend
 * @param {DocumentNode} props.operations.setPaymentMethodOnCartMutation mutation to set pixqrcode as payment
 *
 * @returns {
 *  comment: String,
 *  onBillingAddressChangedError: Function,
 *  onBillingAddressChangedSuccess: Function
 * }
 */

export const usePixQRCode = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        getPixQRCodeConfigQuery,
        setPaymentMethodOnCartMutation
    } = operations;

    const [{ cartId }] = useCartContext();
    const { data } = useQuery(getPixQRCodeConfigQuery);

    const { resetShouldSubmit, onPaymentSuccess, onPaymentError } = props;

    const [
        updatePaymentMethod,
        {
            error: paymentMethodMutationError,
            called: paymentMethodMutationCalled,
            loading: paymentMethodMutationLoading
        }
    ] = useMutation(setPaymentMethodOnCartMutation);

    /**
     * This function will be called if cant not set address.
     * */
    const onBillingAddressChangedError = useCallback(() => {
        resetShouldSubmit();
    }, [resetShouldSubmit]);

    /**
     * This function will be called if address was successfully set.
     * */
    const onBillingAddressChangedSuccess = useCallback(() => {
        updatePaymentMethod({
            variables: { cartId }
        });
    }, [updatePaymentMethod, cartId]);

    useEffect(() => {
        const paymentMethodMutationCompleted =
            paymentMethodMutationCalled && !paymentMethodMutationLoading;

        if (paymentMethodMutationCalled && !paymentMethodMutationError) {
            onPaymentSuccess();
        }

        if (paymentMethodMutationCompleted && paymentMethodMutationError) {
            onPaymentError();
        }
    }, [
        paymentMethodMutationError,
        paymentMethodMutationLoading,
        paymentMethodMutationCalled,
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit
    ]);

    return {
        comment:
            data && data.storeConfig && data.storeConfig.pix_qrcode_comment,
        onBillingAddressChangedError,
        onBillingAddressChangedSuccess
    };
};

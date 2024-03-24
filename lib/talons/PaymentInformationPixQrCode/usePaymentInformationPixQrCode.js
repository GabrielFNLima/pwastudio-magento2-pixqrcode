import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from './paymentInformationPixQrCode.gql';

/**
 * Talon to handle payment information for pixqrcode payment.
 *
 * @param {String} props.orderNumber the order number
 *
 * @returns {
 *  payload_pix: String,
 *  qrcode: String,
 *  loading: Boolean
 * }
 */

export const usePaymentInformationPixQrCode = props => {
    const [isCopied, setIsCopied] = useState(false);
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        getPaymentAdditionalInformationPixQrcode,
        getPixProofPaymentQuery
    } = operations;

    const { orderNumber } = props;

    const { data, loading, error } = useQuery(
        getPaymentAdditionalInformationPixQrcode,
        {
            variables: { orderNumber },
            fetchPolicy: 'cache-and-network'
        }
    );

    const { data: proofPaymentData } = useQuery(getPixProofPaymentQuery, {
        fetchPolicy: 'cache-and-network'
    });

    const handleCopy = useCallback(
        async copyText => {
            await navigator.clipboard.writeText(copyText);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        },
        [setIsCopied]
    );

    return {
        payloadPix:
            data && data.pixQrCodePaymentAdditionalInformation.payload_pix,
        qrcode: data && data.pixQrCodePaymentAdditionalInformation.qrcode,
        typeOfProofPayment:
            proofPaymentData &&
            proofPaymentData.storeConfig.pix_qrcode_type_proof_payment,
        email:
            proofPaymentData &&
            proofPaymentData.storeConfig.pix_qrcode_send_proof_payment_to_email,
        whatsappNumber:
            proofPaymentData &&
            proofPaymentData.storeConfig
                .pix_qrcode_send_proof_payment_to_whatsapp_number,
        loading,
        error,
        isCopied,
        handleCopy
    };
};

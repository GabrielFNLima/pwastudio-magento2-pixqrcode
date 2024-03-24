import { gql } from '@apollo/client';

const GET_PAYMENT_ADDITIONAL_INFORMATION_PIX_QRCODE = gql`
    query getPaymentAdditionalInformationPixQrcode($orderNumber: String!) {
        pixQrCodePaymentAdditionalInformation(order_number: $orderNumber) {
            payload_pix
            qrcode
        }
    }
`;

export const GET_PIX_PROOF_PAYMENT = gql`
    query storeConfigData {
        storeConfig {
            store_code
            pix_qrcode_type_proof_payment
            pix_qrcode_send_proof_payment_to_email
            pix_qrcode_send_proof_payment_to_whatsapp_number
        }
    }
`;

export default {
    getPaymentAdditionalInformationPixQrcode: GET_PAYMENT_ADDITIONAL_INFORMATION_PIX_QRCODE,
    getPixProofPaymentQuery: GET_PIX_PROOF_PAYMENT
};

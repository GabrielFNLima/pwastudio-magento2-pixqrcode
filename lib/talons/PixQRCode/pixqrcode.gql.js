import { gql } from '@apollo/client';

export const GET_PIX_QR_CODE_CONFIG_DATA = gql`
    query storeConfigData {
        storeConfig {
            store_code
            pix_qrcode_title
            pix_qrcode_comment
        }
    }
`;

export const SET_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart($cartId: String!) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: { code: "gfnl_pixqrcode" }
            }
        ) {
            cart {
                id
                selected_payment_method {
                    code
                    title
                }
            }
        }
    }
`;

export default {
    getPixQRCodeConfigQuery: GET_PIX_QR_CODE_CONFIG_DATA,
    setPaymentMethodOnCartMutation: SET_PAYMENT_METHOD_ON_CART
};

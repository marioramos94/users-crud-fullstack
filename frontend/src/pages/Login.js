import React, { useContext } from 'react';
import { OktaSignInWidget } from '../components/OktaSignInWidget'
import Context from "../Context";

export const Login = ()=>{
    const { activateAuth } = useContext(Context)
    const onSuccess = (response) => {
        let token = response.accessToken.value
        activateAuth(token)
    }
    const onError = (err) => {
        throw err;
    }
    return <OktaSignInWidget onSuccess={onSuccess} onError = {onError} ></OktaSignInWidget>
}

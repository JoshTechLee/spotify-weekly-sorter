import { sha256 } from 'js-sha256';
import base64url from 'base64url';

export const codeVerifier = () => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-~';
    const charactersLength = characters.length;
    const length = Math.random() * (127 - 44) + 44;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
};

export const codeChallenge = (code) => {
    return base64url(sha256(code));
};

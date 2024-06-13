import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('mdpSecret');

export async function decodeToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return;
    }
}

export async function isConnectedVerify(token: string) {
    try {
        await jwtVerify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
}

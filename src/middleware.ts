// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { isConnectedVerify } from './lib/utils/decodeToken';

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isLoggedIn = async (): boolean => {
        if (!request.cookies.get('tokenAuth')) return false;
        return await isConnectedVerify(request.cookies.get('tokenAuth')?.value);
    };

    // Rediriger l'utilisateur s'il n'est pas connecté et tente d'accéder à une page protégée
    if (!(await isLoggedIn()) && pathname.startsWith('/espace-utilisateur')) {
        const url = request.nextUrl.clone();
        url.pathname = '/connexion';
        return NextResponse.redirect(url);
    }

    if ((await isLoggedIn()) && pathname.startsWith('/connexion')) {
        const url = request.nextUrl.clone();
        url.pathname = '/espace-utilisateur';
        return NextResponse.redirect(url);
    }

    if (pathname.valueOf() === '/') {
        const url = request.nextUrl.clone();
        (await isLoggedIn()) ? (url.pathname = '/espace-utilisateur') : (url.pathname = '/connexion');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/espace-utilisateur/:path*', '/connexion/:path*', '/'],
};

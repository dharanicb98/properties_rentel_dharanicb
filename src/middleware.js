import { NextResponse } from "next/server";

export async function middleware(request) {
    try {
        const authToken = request.cookies.get('authToken')?.value;

        if (!authToken) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        const { username } = JSON.parse(atob(authToken));

        if (!username ) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        let existingUsers = request.cookies.get('users')?.value;

      

        if (!existingUsers) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        let data = existingUsers && JSON.parse(existingUsers) || []
       
        const userExists = data.some(user => user.username === username);

        if (!userExists) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    
        return NextResponse.next();

    }
    catch (e) {
        console.log('error in middleware', e)
        return NextResponse.redirect(new URL('/signin', request.url))  
    }
}

export const config = {
    matcher: [
        '/'
    ]
}
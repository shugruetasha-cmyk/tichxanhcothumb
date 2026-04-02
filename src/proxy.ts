import { NextRequest, NextResponse } from 'next/server';

export const proxy = async (req: NextRequest) => {
    const ua = req.headers.get('user-agent');
    const header_x_forwarded_for = req.headers.get('x-forwarded-for');
    const header_x_nf_client_connection_ip = req.headers.get('x-nf-client-connection-ip');
    if(header_x_forwarded_for || header_x_nf_client_connection_ip){
            const ip = header_x_forwarded_for.split(',')[0] || header_x_nf_client_connection_ip;
            if (ip.toString().includes('218.35.163.152')){
                return new NextResponse(null, { status: 404 });
            }
    }
    const { pathname } = req.nextUrl;

    if (!pathname.startsWith('/contact')) {
        return NextResponse.next();
    }
    const currentTime = Date.now();
    const token = req.cookies.get('token')?.value;
    const pathSegments = pathname.split('/');
    const slug = pathSegments[2];

    const isValid = token && slug && Number(slug) - Number(token) < 240000 && currentTime - Number(token) < 240000;

    if (isValid) {
        return NextResponse.next();
    }

    return new NextResponse(null, { status: 404 });
};

export const config = {
    matcher: ['/contact/:path*', '/live']
};

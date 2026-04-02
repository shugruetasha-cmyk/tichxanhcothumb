import { NextRequest, NextResponse } from 'next/server';

const POST = async (request: NextRequest) => {
  const headerEntries = Object.fromEntries(request.headers.entries());

  return NextResponse.json(headerEntries);
};

export { POST };

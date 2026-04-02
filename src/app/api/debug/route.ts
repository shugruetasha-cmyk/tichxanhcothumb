import { NextRequest, NextResponse } from 'next/server';

const GET = async (request: NextRequest) => {
  const headerEntries = Object.fromEntries(request.headers.entries());

  return NextResponse.json(headerEntries);
};

export { GET };

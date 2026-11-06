import { NextResponse } from 'next/server';
import { createQuill, quillRequestArgs, type QuillRequestBody } from './client';

export async function POST(request: Request) {
  const quill = createQuill();
  if (quill instanceof NextResponse) return quill;

  const body = (await request.json()) as QuillRequestBody;

  try {
    const result = await quill.query(quillRequestArgs(body));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Quill query failed.',
      },
      { status: 500 },
    );
  } finally {
    await quill.close();
  }
}

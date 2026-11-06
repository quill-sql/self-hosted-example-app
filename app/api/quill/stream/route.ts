import { NextResponse } from 'next/server';
import { createQuill, quillRequestArgs, type QuillRequestBody } from '../client';

type StreamEvent = {
  type?: string;
  delta?: string;
  errorText?: string;
  data?: unknown;
};

function eventData(event: StreamEvent): string | null {
  if (event.type === 'start') return null;
  if (event.type === 'done') return '[DONE]';
  if (event.type === 'text-delta') return JSON.stringify(event.delta ?? '');
  if (event.type === 'error') {
    return JSON.stringify({ error: event.errorText });
  }
  if (event.data !== undefined) return JSON.stringify(event.data);
  return JSON.stringify(event);
}

export async function POST(request: Request) {
  const quill = createQuill();
  if (quill instanceof NextResponse) return quill;

  const body = (await request.json()) as QuillRequestBody;
  const encoder = new TextEncoder();
  let closed = false;
  let finished = false;

  const stream = new ReadableStream({
    async start(controller) {
      const write = (data: string) => {
        if (closed || (finished && data === '[DONE]')) return;
        if (data === '[DONE]') finished = true;
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      try {
        const events = await quill.stream({
          ...quillRequestArgs(body),
          signal: request.signal,
        });

        for await (const event of events) {
          if (closed || request.signal.aborted) break;
          const data = eventData(event as StreamEvent);
          if (data === null) continue;
          write(data);
          if (data === '[DONE]') break;
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Quill query failed.';
        write(JSON.stringify({ error: message }));
      } finally {
        write('[DONE]');
        closed = true;
        await quill.close();
        controller.close();
      }
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

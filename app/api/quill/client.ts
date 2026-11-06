import { DatabaseType, Quill } from '@quillsql/node';
import { NextResponse } from 'next/server';

export type QuillRequestBody = {
  metadata: {
    tenants?: unknown[];
    [key: string]: unknown;
  };
};

export function quillRequestArgs(
  body: QuillRequestBody,
): Parameters<Quill['query']>[0] {
  return {
    tenants: body.metadata.tenants?.length
      ? body.metadata.tenants
      : ['QUILL_ALL_TENANTS'], // QUILL_ALL_TENANTS allows cross-tenant access. Should only be used for internal deployments
    metadata: body.metadata,
    adminEnabled: true, // Enables admin usage - should only be used for the admin app internal deployment
  } as unknown as Parameters<Quill['query']>[0];
}

export function createQuill(): Quill | NextResponse {
  const privateKey = process.env.QUILL_PRIVATE_KEY;
  const databaseConnectionString = process.env.DATABASE_URL;

  if (!privateKey || !databaseConnectionString) {
    return NextResponse.json(
      {
        error:
          'Missing QUILL_PRIVATE_KEY or DATABASE_URL environment variables.',
      },
      { status: 500 },
    );
  }

  return new Quill({
    privateKey,
    databaseType: DatabaseType.postgresql,
    databaseConnectionString,
    metadataServerURL:
      process.env.QUILL_METADATA_SERVER_URL ?? 'http://localhost:8080',
  });
}

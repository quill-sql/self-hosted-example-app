import { DatabaseType, Quill } from '@quillsql/node';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const quill = new Quill({
    privateKey: process.env.QUILL_PRIVATE_KEY!,
    databaseType: DatabaseType.postgresql,
    databaseConnectionString: process.env.DATABASE_URL!,
  });

  if (!quill) {
    return NextResponse.json(
      {
        error:
          'Missing QUILL_PRIVATE_KEY or QUILL_DATABASE_URL environment variables.',
      },
      { status: 500 },
    );
  }

  const body = await request.json();

  try {
    const result = await quill.query({
      tenants: body.metadata.tenants?.length
        ? body.metadata.tenants
        : ['QUILL_ALL_TENANTS'], // QUILL_ALL_TENANTS allows cross-tenant access. Should only be used for internal deployments
      metadata: body.metadata,
      adminEnabled: true, // Enables admin usage - should only be used for the admin app internal deployment
    });

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

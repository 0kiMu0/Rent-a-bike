import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await pool.query('DELETE FROM bikes WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Bike deleted' }, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Greška u DELETE /api/bikes/[id]:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

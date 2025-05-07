import { NextRequest } from 'next/server';
import pool from '@/app/lib/db';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params; 
      await pool.query('DELETE FROM bikes WHERE id = $1', [id]);
      return new Response(JSON.stringify({ message: 'Bike deleted' }), { status: 200 });
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Greška u DELETE /api/bikes:', error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
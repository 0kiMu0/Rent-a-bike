import { NextRequest } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM bikes');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Database error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { name, location, description, status } = body;
  
      const result = await pool.query(
        'INSERT INTO bikes (name, location, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, location, description, status]
      );
  
      return new Response(JSON.stringify(result.rows[0]), { status: 201 });
    } catch (err: unknown) {
        const error = err as Error;
        console.error('Greška u POST /api/bikes:', error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
      
  }
  

import { deleteBikeById } from '@/app/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(_: NextRequest, { params }: { params: { id: number } }) {
  try {
    await deleteBikeById(params.id);
    return NextResponse.json({ message: 'Bike deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting bike', error);
    return NextResponse.json({ error: 'Failed to delete bike' }, { status: 500 });
  }
}

'use server';

import sql from '@/app/lib/db';

export async function CreateBike(formData: FormData) {
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const available = formData.get('available') === 'on';

    try {
        await sql`
      INSERT INTO bikes (title, location, description, available)
      VALUES (${title}, ${location}, ${description}, ${available})
    `;
    } catch (error) {
        console.error('Error inserting bike:', error);
        throw new Error('Failed to create bike');
    }
}

export async function getAllBikes() {
    const res = await sql`SELECT * FROM bikes ORDER BY id DESC`;
    return res;
}

export async function deleteBikeById(id: number) {
    await sql`DELETE FROM bikes WHERE id = ${id}`;
}

export async function getBikeById(id: number) {
    const result = await sql`SELECT * FROM bikes WHERE id = ${id}`;
    return result[0];
  }
  
  export async function updateBike(formData: FormData) {
    const id = Number(formData.get('id'));
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const available = formData.get('available') === 'on';
  
    try {
      await sql`
        UPDATE bikes
        SET title = ${title},
            location = ${location},
            description = ${description},
            available = ${available}
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error('Error updating bike:', error);
      throw new Error('Failed to update bike');
    }
  }
  
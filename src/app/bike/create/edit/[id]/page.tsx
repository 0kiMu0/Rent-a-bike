'use server';

import { getBikeById, updateBike } from '@/app/lib/actions';

interface Props {
  params: { id: string };
}

export default async function EditBikePage({ params }: Props) {
  const bike = await getBikeById(Number(params.id));

  if (!bike) {
    return <p>Bike not found.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color: 'inherit' }}>Edit Bike</h1>
      <form action={updateBike}>
        <input type="hidden" name="id" value={bike.id} />
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#f0f0f0' }}>Name</label>
          <input
            name="title"
            defaultValue={bike.title}
            required
            style={{ width: '100%', padding: '0.4rem 0.8rem', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#f0f0f0' }}>Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={bike.description || ''}
            style={{ width: '100%', padding: '0.4rem 0.8rem', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, color: '#f0f0f0' }}>Location</label>
          <input
            name="location"
            defaultValue={bike.location || ''}
            style={{ width: '100%', padding: '0.4rem 0.8rem', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ color: '#f0f0f0' }}>
            Available
            <input
              type="checkbox"
              name="available"
              defaultChecked={bike.available}
              style={{ marginLeft: '8px', position: 'relative', top: '2px' }}
            />
          </label>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" style={{ padding: '0.4rem 0.8rem' }}>Update</button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface Bike {
  id: number;
  name: string;
  location: string;
  description: string;
  status: string;
}

export default function BikeList() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBikes = async () => {
    try {
      const res = await fetch('/api/bikes');
      const data = await res.json();
      setBikes(data);
      setLoading(false);
    } catch (err) {
      console.error('Greška pri dohvaćanju bicikala:', err);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Jeste li sigurni da želite obrisati ovo biciklo?');
    if (!confirmed) return;

    try {
      await fetch(`/api/bikes/${id}`, {  // ID u URL-u
        method: 'DELETE',
      });

      // Refresh state
      setBikes((prev) => prev.filter((bike) => bike.id !== id));
    } catch (err) {
      console.error('Greška pri brisanju bicikla:', err);
    }
  };

  if (loading) return <p className="text-center">Učitavanje...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <div key={bike.id} className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">{bike.name}</h2>
          <p className="text-gray-600 mb-1"><strong>Lokacija:</strong> {bike.location}</p>
          <p className="text-gray-600 mb-1"><strong>Status:</strong> {bike.status}</p>
          <p className="text-gray-600 mb-3"><strong>Opis:</strong> {bike.description}</p>
          <button
            onClick={() => handleDelete(bike.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Obriši
          </button>
        </div>
      ))}
    </div>
  );
}

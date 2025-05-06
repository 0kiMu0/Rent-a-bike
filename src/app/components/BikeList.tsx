'use client';
import { useEffect, useState } from 'react';

type Bike = {
  id: number;
  name: string;
  location: string;
  description: string;
  status: boolean;
};

export default function BikeList() {
  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    const fetchBikes = async () => {
      const res = await fetch('/api/bikes');
      const data = await res.json();
      setBikes(data);
    };

    fetchBikes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Lista bicikala</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bikes.map((bike) => (
          <div key={bike.id} className="bg-white p-4 rounded shadow border">
            <h3 className="text-lg font-semibold">{bike.name}</h3>
            <p><strong>Lokacija:</strong> {bike.location}</p>
            <p><strong>Opis:</strong> {bike.description}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={bike.status ? 'text-red-600' : 'text-green-600'}>
                {bike.status ? 'Rezervisano' : 'Dostupno'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

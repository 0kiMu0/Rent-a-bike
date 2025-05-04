'use client';
import { useState, useEffect } from 'react';

type Bike = {
  id: number;
  name: string;
  location: string;
  description: string;
  status: boolean;
};


export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    status: false,
  });

  const [bikes, setBikes] = useState<Bike[]>([]); // Za bicikle koji će biti prikazani
  const [showForm, setShowForm] = useState(false); // Kontrola prikaza forme

  // Funkcija za učitavanje bicikala sa API-a
  useEffect(() => {
    const fetchBikes = async () => {
      const res = await fetch('/api/bikes');
      const data = await res.json();
      setBikes(data);
    };

    fetchBikes();
  }, []);

  // Funkcija za promenu podataka u formi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Funkcija za submit forme
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/bikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Biciklo dodano!');
      const newBike = await res.json();
      setBikes((prevBikes) => [...prevBikes, newBike]); // Dodaj novo biciklo u listu
      setFormData({ name: '', location: '', description: '', status: false });
      setShowForm(false); // Sakrij formu nakon dodavanja
    } else {
      const errorData = await res.json();
      alert(`Greška pri dodavanju: ${errorData.error}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Dugme za prikaz forme */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white mb-4"
        >
          Dodaj biciklo
        </button>
      )}

      {/* Prikaz forme za dodavanje bicikla */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4 border rounded-md shadow-md bg-white">
        <input
          type="text"
          name="name"
          placeholder="Naziv bicikla"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="location"
          placeholder="Lokacija"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          placeholder="Opis"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          <span>Rezervisano?</span>
        </label>
      
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Dodaj biciklo
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setFormData({ name: '', location: '', description: '', status: false });
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Otkaži
          </button>
        </div>
      </form>      
      )}

      {/* Prikaz bicikala u karticama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {bikes.map((bike) => (
          <div key={bike.id} className="border p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">{bike.name}</h3>
            <p>{bike.location}</p>
            <p>{bike.description}</p>
            <p>Status: {bike.status ? 'Rezervisano' : 'Dostupno'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

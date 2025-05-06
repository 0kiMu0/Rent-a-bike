'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBikeForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/bikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Biciklo dodano!');
      setFormData({ name: '', location: '', description: '', status: false });
      router.refresh(); // osvježi listu
    } else {
      const error = await res.json();
      alert(`Greška: ${error.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <h2 className="text-2xl font-semibold">Dodaj novo biciklo</h2>
      <input
        type="text"
        name="name"
        placeholder="Naziv"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Lokacija"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Opis"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="mr-2"
        />
        Rezervisano
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Dodaj
      </button>
    </form>
  );
}

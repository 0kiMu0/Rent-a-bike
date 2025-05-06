import AddBikeForm from '../components/AddBikeForm';
import Link from 'next/link';

export default function AddBikePage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dodaj novo biciklo</h1>

        <AddBikeForm />

        <div className="mt-4">
          <Link href="/">
            <button className="text-blue-600 underline">Nazad na listu</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
import BikeList from './components/BikeList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Rent a Bike</h1>

        <div className="border-b-2 border-black w-1/2 mx-auto mb-8" />

        <div className="text-center mb-6">
          <Link href="/add">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Dodaj biciklo
            </button>
          </Link>
        </div>

        <BikeList />
      </div>
    </main>
  );
}

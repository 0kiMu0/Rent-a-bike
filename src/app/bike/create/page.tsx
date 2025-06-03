"use server";

import { CreateBike } from "@/app/lib/actions";

export default async function CreateBikePage(){
    return(
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', color: 'inherit' }}>Add new bike</h1>
            <form action={CreateBike} className="flex flex-col gap-6 max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-md shadow-md bg-white text-gray-800">
                <label className="flex flex-col text-sm font-medium">
                    Title:
                    <input
                    type="text"
                    name="title"
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </label>
                
                <label className="flex flex-col text-sm font-medium">
                    Location:
                    <input
                    type="text"
                    name="location"
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </label>

                <label className="flex flex-col text-sm font-medium">
                    Description:
                    <textarea
                    name="description"
                    rows={3}
                    className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </label>

                <label className="inline-flex items-center gap-2 text-sm font-medium">
                    <input
                    type="checkbox"
                    name="available"
                    className="accent-blue-500"
                    />
                    Available
                </label>

                <button
                    type="submit"
                    className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                >
                    Create
                </button>
            </form>
        </div>
    );
}
import { useEffect, useState } from "react";
import ListingCard from "./components/ListingCard";
import type { Listing } from "./types";

export default function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/flea.json`
        );

        if (!response.ok) {
          throw new Error("Failed to load listings.");
        }

        const data: Listing[] = await response.json();

        setListings(data.filter((listing) => !listing.sold));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Барахолка</h1>



      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {listings.map((listing) => (
          <ListingCard
            key={`${listing.company}-${listing.name}`}
            listing={listing}
          />
        ))}
      </div>
    </main>
  );
}

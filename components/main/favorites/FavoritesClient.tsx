"use client";

import Heading from "@/components/modals/Heading";
import Container from "@/components/navbar/Container";
import { SafeListings, SafeUser } from "@/types";
import ListingCard from "../listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListings[];
  currentUser?: SafeUser | null;
}

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite places!" />
      <div
        className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      "
      >
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            currentUser={currentUser}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;

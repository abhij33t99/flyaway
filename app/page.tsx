import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/navbar/Container";
import EmptyState from "@/components/main/EmptyState";
import { IListingsParams, getListings } from "@/actions/getListings";
import ListingCard from "@/components/main/listings/ListingCard";
import { currentUser } from "@/lib/auth";
import { SafeListings } from "@/types";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const user = await currentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
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
          {listings.map((listing: SafeListings) => {
            return (
              <ListingCard key={listing.id} data={listing} currentUser={user} />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}

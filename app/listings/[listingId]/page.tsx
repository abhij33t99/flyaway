import { getListingById } from "@/actions/getListingById";
import { getReservations } from "@/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/main/EmptyState";
import ListingClient from "@/components/main/listings/ListingClient";
import { currentUser } from "@/lib/auth";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params.listingId);
  const reservations = await getReservations(params);
  const user = await currentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={user}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;

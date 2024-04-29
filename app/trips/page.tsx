import { getReservations } from "@/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/main/EmptyState";
import TripsClient from "@/components/main/trips/TripsClient";
import { currentUser } from "@/lib/auth";

const TripsPage = async () => {
  const user = await currentUser();
  if (!user) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized!" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: user.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found!"
          subtitle="Looks like you have not reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={user} />
    </ClientOnly>
  );
};

export default TripsPage;

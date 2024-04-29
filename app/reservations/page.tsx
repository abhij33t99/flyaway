import { getReservations } from "@/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/main/EmptyState";
import ReservationClient from "@/components/main/reservations/ReservationClient";
import { currentUser } from "@/lib/auth";

const ReservationPage = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized!" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: user.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Book to see reservations"
        />
      </ClientOnly>
    );
}

    return (
        <ClientOnly>
            <ReservationClient
                reservations = {reservations}
                currentUser= {user}
            />
        </ClientOnly>
    )
};

export default ReservationPage;

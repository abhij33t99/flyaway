"use client";

import Heading from "@/components/modals/Heading";
import Container from "@/components/navbar/Container";
import { SafeReservations, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "@/components/main/listings/ListingCard";

interface TripsClientProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservations[];
}

const TripsClient = ({ currentUser, reservations }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled successfully!");
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Trips" subtitle="Your recent trips" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel booking"
            currentUser={currentUser}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;

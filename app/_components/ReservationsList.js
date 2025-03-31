"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

function ReservationsList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  function handleDeleteReservation(bookingId) {
    deleteReservationAction(bookingId);
    optimisticDelete(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDeleteReservation}
        />
      ))}
    </ul>
  );
}

export default ReservationsList;

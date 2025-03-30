"use client";

import { useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { deleteReservationAction } from "@/app/_lib/actions";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDeleteReservation() {
    if (confirm("Are you sure that you want to delet this reservation."))
      startTransition(() => deleteReservationAction(bookingId));
  }

  return (
    <button
      onClick={handleDeleteReservation}
      className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex flex-grow cursor-pointer items-center gap-2 px-3 text-xs font-bold uppercase transition-colors"
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;

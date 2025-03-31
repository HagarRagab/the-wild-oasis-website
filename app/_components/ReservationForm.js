"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";
import { createReservationAction } from "../_lib/actions";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { id, regularPrice, discount, maxCapacity } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = Number(differenceInDays(endDate, startDate));
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservationAction.bind(
    null,
    reservationData,
  );

  return (
    <div className="flex h-full flex-col">
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-8 py-2 md:px-16">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            referrerPolicy="no-referrer" // Important to display google profile images
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={(formData) => {
          createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 flex flex-1 flex-col justify-center gap-5 px-8 py-10 text-lg md:px-16"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-accent-500 h-4 w-4 rounded-xs"
            id="hasBreakfast"
            name="hasBreakfast"
          />
          <label htmlFor="hasBreakfast">Add breakfast</label>
        </div>

        <div className="flex items-center justify-end gap-6">
          {!startDate || !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton>Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

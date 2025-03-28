"use client";

import { useReservation } from "./ReservationContext";

function ReservationForm({ guestsNum, user }) {
  const { range } = useReservation();
  const maxCapacity = guestsNum;

  return (
    <div className="flex h-full flex-col">
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-8 py-2 md:px-16">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form className="bg-primary-900 flex flex-1 flex-col justify-center gap-5 px-8 py-10 text-lg md:px-16">
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

        <div className="flex items-center justify-end gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

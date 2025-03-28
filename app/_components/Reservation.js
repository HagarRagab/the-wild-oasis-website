import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  const session = await auth();

  return (
    <div className="border-primary-800 grid min-h-[400px] grid-cols-1 border md:grid-cols-2">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm guestsNum={cabin.maxCapacity} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;

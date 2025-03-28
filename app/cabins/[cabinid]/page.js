import { getCabin, getCabins } from "@/app/_lib/data-service";

import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export async function generateMetadata({ params }) {
  const { cabinid } = await params;
  const { name } = await getCabin(cabinid);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => {
    return {
      cabinid: String(cabin.id),
    };
  });

  return ids;
}

export default async function Page({ params }) {
  const { cabinid } = await params;
  const cabin = await getCabin(cabinid);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-3xl font-semibold md:text-5xl">
          Reserve {cabin.name} cabin today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

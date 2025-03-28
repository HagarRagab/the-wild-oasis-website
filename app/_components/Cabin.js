import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function Cabin({ cabin }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="border-primary-800 mb-24 border px-6 py-3 md:grid md:grid-cols-[3fr_4fr] md:gap-20 md:px-10">
      <div className="relative aspect-square min-w-full md:aspect-auto md:-translate-x-3 md:scale-[1.15]">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover"
          fill
        />
      </div>

      <div>
        <h3 className="text-accent-100 bg-primary-950 mb-5 p-6 pb-1 text-5xl font-black md:w-[150%] md:translate-x-[-254px] md:text-7xl">
          Cabin {name}
        </h3>

        <p className="text-primary-300 mb-10 text-lg">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;

import Image from "next/image";

async function UpdateProfileForm({ children, guest, session }) {
  return (
    <form className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={session.user.name}
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={guest.email}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest.countryFlag && (
            <Image
              src={guest.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
              width={20}
              height={20}
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          value={guest.nationalID}
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <button className="bg-accent-500 text-primary-800 hover:bg-accent-600 cursor-pointer px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex w-full cursor-pointer items-center gap-4 px-5 py-3 font-semibold transition-colors">
        <ArrowLeftStartOnRectangleIcon className="text-primary-600 h-5 w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;

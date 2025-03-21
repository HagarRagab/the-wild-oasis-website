import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="border-primary-900 border-b px-8 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-[auto_1fr] gap-4 md:grid-cols-[16rem_1fr] md:gap-12">
      <SideNavigation />
      <div className="md:py-12">{children}</div>
    </div>
  );
}

import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-12">{children}</div>
    </div>
  );
}

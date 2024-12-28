import { Outlet } from "react-router";

function Main() {
  return (
    <main className="col-start-2 col-end-3 row-span-2 row-start-2 rounded-tl-[2rem] bg-muted border-primary px-16 py-10 overflow-auto scrollbar-hidden">
      <Outlet />
    </main>
  );
}

export default Main;

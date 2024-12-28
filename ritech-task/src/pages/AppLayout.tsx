import Header from "@/components/Header";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";


function AppLayout() {


  return (
    <div className="w-100 grid h-dvh grid-cols-[20rem_1fr] grid-rows-[5rem_1fr] overflow-hidden bg-background">
      <Header />
      <Navbar />
      <Main />
    </div>
  );
}

export default AppLayout;

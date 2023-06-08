import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { HomePageContextProvider } from "../context/HomePageContext";

const Home = () => {
  return (
    <HomePageContextProvider>
      <div className="w-full h-screen xl:py-5 flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50">
        <div className="relative w-full h-full flex  divide-x divide-neutral-950 dark:divide-neutral-50 max-w-7xl xl:rounded-xl overflow-hidden xl:border border-neutral-950 dark:border-neutral-50">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </HomePageContextProvider>
  );
};
export default Home;

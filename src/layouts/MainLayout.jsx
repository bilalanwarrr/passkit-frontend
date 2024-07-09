import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="hidden lg:block p-2">
        <img
          src="/src/assets/cover.jpg"
          className="w-full h-full object-cover rounded-3xl"
          alt=""
        />
      </div>
      <div className="h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

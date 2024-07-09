import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="hidden lg:block">
        <img
          src="/src/assets/cover.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="h-full overflow-auto lg:col-span-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

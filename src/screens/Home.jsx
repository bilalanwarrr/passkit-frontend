import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("walletToken");
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center my-10">
      <p className="text-3xl font-semibold">Welcome Back</p>
      <div className="flex flex-col justify-center p-4 sm:p-10 md:p-36 lg:p-10 gap-6 w-full h-full">
        <Link
          to={"/create-template"}
          className="bg-gray-300 hover:bg-gray-400 p-2 text-center"
        >
          Create Template
        </Link>
        <Link
          to={"/create-campaign"}
          className="bg-gray-300 hover:bg-gray-400 p-2 text-center"
        >
          Create Campaign
        </Link>
        <Link
          to={"/create-passes"}
          className="bg-gray-300 hover:bg-gray-400 p-2 text-center"
        >
          Create Passes
        </Link>
        <div className="flex flex-row-reverse">
          <button
            onClick={handleLogout}
            className="border-2 px-4 py-1 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

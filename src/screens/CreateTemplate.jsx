import { useState } from "react";
import { IoIosArrowRoundBack as BackArrow } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";

const initialState = {
  name: "",
  organizationName: "",
  description: "",
  website: "",
  phone: "",
  vip: "",
  lockScreenMessage: "",
  icon: "",
  logo: "",
  hero: "",
  appleLogo: "",
  strip: "",
  lat: 33.566942,
  lng: 73.031648,
};

const CreateTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleReset = () => {
    setData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = import.meta.env.VITE_API_URL;
    const imagesUrl = url + "api/images";
    const templateUrl = url + "api/template/create";

    try {
      const imagesFormData = new FormData();
      imagesFormData.append("icon", data.icon);
      imagesFormData.append("logo", data.logo);
      imagesFormData.append("appleLogo", data.appleLogo);
      imagesFormData.append("hero", data.hero);
      imagesFormData.append("strip", data.strip);

      const response1 = await fetch(imagesUrl, {
        method: "POST",
        body: imagesFormData,
      });

      if (response1.ok) {
        const responseData = await response1.json();
        const templateData = {
          name: data.name,
          organizationName: data.organizationName,
          description: data.description,
          website: data.website,
          phone: data.phone,
          vip: data.vip,
          icon: responseData.icon,
          logo: responseData.logo,
          appleLogo: responseData.appleLogo,
          hero: responseData.hero,
          strip: responseData.strip,
          location: { lat: data.lat, lng: data.lng },
          lockScreenMessage: data.lockScreenMessage,
        };

        const response2 = await fetch(templateUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(templateData),
        });

        if (response2.ok) {
          toast.success("Template created successfully");
        } else {
          throw new Error("Failed to create template");
        }
      } else {
        throw new Error("Failed to upload images");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      handleReset();
    }
  };

  return (
    <div className="py-10 mx-10 flex flex-col items-center h-full overflow-auto">
      <div className="relative w-full mb-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <Link to={"/"} className="text-3xl">
            <BackArrow />
          </Link>
        </div>
        <h2 className="text-3xl text-center">Create Template</h2>
      </div>
      <div className="h-full w-full flex-grow overflow-auto custom-scrollbar">
        <form
          action=""
          className="flex flex-col gap-4 w-96 mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name">Template Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="name"
              value={data.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="Smith"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="organizationName">Organization Name</label>
            <input
              type="text"
              id="organizationName"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="organizationName"
              value={data.organizationName}
              onChange={handleChange}
              disabled={loading}
              placeholder="Ford"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="description"
              rows={2}
              value={data.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Ford Motor Company is an American "
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              disabled={loading}
              placeholder="0800-567-908"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="website">Web URL</label>
            <input
              type="url"
              id="website"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="website"
              value={data.website}
              onChange={handleChange}
              disabled={loading}
              placeholder="https://www.ford.com"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="vip">VIP</label>
            <input
              type="text"
              id="vip"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="vip"
              value={data.vip}
              onChange={handleChange}
              disabled={loading}
              placeholder="VIP"
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="icon">Icon</label>
              <span className="text-sm font-bold text-red-500">114 x 114</span>
            </div>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="icon"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.icon === "" ? "No file chosen" : `${data.icon?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="icon"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none hidden"
              name="icon"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="logo">Logo</label>
              <span className="text-sm font-bold text-red-500">660 x 660</span>
            </div>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="logo"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.logo === "" ? "No file chosen" : `${data.logo?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="logo"
              className="border border-gray-400 hidden px-2 py-1 rounded-md outline-none"
              name="logo"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="appleLogo">Apple Logo</label>
              <span className="text-sm font-bold text-red-500">480 x 150</span>
            </div>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="appleLogo"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.appleLogo === ""
                  ? "No file chosen"
                  : `${data.appleLogo?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="appleLogo"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none hidden"
              name="appleLogo"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="hero">Hero</label>
              <span className="text-sm font-bold text-red-500">1032 x 330</span>
            </div>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="hero"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.hero === "" ? "No file chosen" : `${data.hero?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="hero"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none hidden"
              name="hero"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between">
              <label htmlFor="strip">Strip</label>
              <span className="text-sm font-bold text-red-500">1125 x 432</span>
            </div>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="strip"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.strip === "" ? "No file chosen" : `${data.strip?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="strip"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none hidden"
              name="strip"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lat">Latitude</label>
            <input
              type="text"
              id="lat"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="lat"
              value={data.lat}
              onChange={handleChange}
              disabled={loading}
              placeholder="123.09"
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lng">Longitude</label>
            <input
              type="text"
              id="lng"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="lockScreenMessage"
              value={data.lng}
              onChange={handleChange}
              disabled={loading}
              placeholder="234.90"
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lockScreenMessage">Lock Screen Message</label>
            <input
              type="text"
              id="lockScreenMessage"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="lockScreenMessage"
              value={data.lockScreenMessage}
              onChange={handleChange}
              disabled={loading}
              placeholder="Avail your offer"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-gray-300 p-2 hover:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplate;

import { useEffect, useState } from "react";
import { IoIosArrowRoundBack as BackArrow } from "react-icons/io";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";
import toast from "react-hot-toast";

const initialState = {
  campaignId: "",
  templateId: "",
  offers: "",
  users: "",
};

const CreateCoupons = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toDownload, setToDownload] = useState(false);
  const [data, setData] = useState(initialState);

  const [templates, setTemplates] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const getTemplates = async () => {
      const url = import.meta.env.VITE_API_URL;
      const templatesUrl = url + "api/template";

      try {
        const response1 = await fetch(templatesUrl);
        if (response1.ok) {
          const data = await response1.json();
          setTemplates(data);

          const campaignsUrl = url + "api/campaigns";
          const response2 = await fetch(campaignsUrl);
          if (response2.ok) {
            const data = await response2.json();
            setCampaigns(data);
          } else {
            throw new Error("Failed to fetch campaigns");
          }
        } else {
          throw new Error("Failed to fetch templates");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setPageLoading(false);
      }
    };

    getTemplates();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "offers" || e.target.name === "users") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = import.meta.env.VITE_API_URL;
    const passCreateUrl = url + "api/pass/create";

    try {
      const formData = new FormData();
      formData.append("campaignId", data.campaignId);
      formData.append("templateId", data.templateId);
      formData.append("offers", data.offers);
      formData.append("users", data.users);

      const response = await fetch(passCreateUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await response.json();
        setToDownload(true);
        toast.success("Passes generated successfully");
      } else {
        throw new Error("Failed to generate passes");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setData(initialState);
    }
  };

  const handleDownload = async () => {
    const url = import.meta.env.VITE_API_URL;
    const downloadUrl = url + "api/download";
    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setToDownload(false);
    }
  };

  if (pageLoading) return <Loader />;

  return (
    <div className="my-10 mx-10 flex flex-col items-center">
      <div className="relative w-full mb-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <Link to={"/"} className="text-3xl">
            <BackArrow />
          </Link>
        </div>
        <h2 className="text-3xl text-center">Generate Passes</h2>
      </div>
      <div>
        <form
          action=""
          className="flex flex-col gap-4 w-96"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="campaignId">Campaign Name</label>
            <select
              id="campaignId"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="campaignId"
              value={data.campaignId}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select Campaign</option>
              {Object.keys(campaigns).map((campaignId) => (
                <option key={campaignId} value={campaignId}>
                  {campaigns[campaignId]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="templateId">Template Name</label>
            <select
              id="templateId"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none"
              name="templateId"
              value={data.templateId}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select Template</option>
              {Object.keys(templates).map((templateId) => (
                <option key={templateId} value={templateId}>
                  {templates[templateId]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="offers">Offers File</label>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="offers"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.offers === "" ? "No file chosen" : `${data.offers?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="offers"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none hidden"
              name="offers"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="users">Users File</label>
            <div className="flex flex-row items-center gap-2 w-full border border-gray-400 rounded-md px-2 py-1">
              <label
                htmlFor="users"
                className="border-2 border-gray-300 px-2 py-1 bg-gray-100 rounded-sm hover:bg-gray-200 cursor-pointer text-sm"
              >
                Choose Icon
              </label>
              <p className="text-sm">
                {data.users === "" ? "No file chosen" : `${data.users?.name}`}
              </p>
            </div>
            <input
              type="file"
              id="users"
              className="border border-gray-400 px-2 py-1 rounded-md outline-none hidden"
              name="users"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button disabled={loading} type="submit" className="bg-gray-300 p-2">
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
              "Generate"
            )}
          </button>
        </form>

        {toDownload && (
          <button
            onClick={handleDownload}
            className="bg-gray-300 p-2 w-96 mt-5"
          >
            {}
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCoupons;

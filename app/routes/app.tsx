import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "remix";

const AppPage: React.FC = () => {
  const navigate = useNavigate();
  const [algo, setAlgo] = useState<string>("search");

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAlgo(event.target.value);
  };

  useEffect(() => {
    if (algo === "search") {
      return navigate("./search");
    }
  }, [algo]);

  return (
    <div className="mt-8 px-[20vw]">
      <h4 className="text-xl font-bold">Select a data structure</h4>
      <div className="flex items-center mt-2">
        <select
          name="algorithms"
          id="algorithms"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        >
          <optgroup label="Arrays"></optgroup>
          <option value="search">Linear Search</option>
        </select>
        <button className="min-w-[200px] px-4 py-2 bg-green-600 text-white ml-2 font-bold rounded">
          Go
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default AppPage;

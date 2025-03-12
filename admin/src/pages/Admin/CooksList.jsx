import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const CooksList = () => {
  const { cooks, aToken, getAllCooks, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllCooks();
    }
  }, [aToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">
        All Cooks
      </h1>

      {cooks.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-lg">
            No cooks available at the moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
          {cooks.map((cook, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cook.image}
                  alt={`Chef ${cook.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {cook.name}
                </h2>
                <p className="text-gray-600 mt-1">{cook.speciality}</p>

                <div className="mt-4 flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      onClick={() => changeAvailability(cook._id)}
                      type="checkbox"
                      checked={cook.available}
                      readOnly
                      className="form-checkbox h-5 w-5 text-blue-600 rounded cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Availability Status
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CooksList;

import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenue = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-700" id="speaciality">
      <h1 className="text-3xl font-medium">Find By Speaciality</h1>
      <p>
        Simply browse through our extensive list of trusted chefs, book your
        cook now!
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} 
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink hover:translate-y-[-10px] transition-all duration-300" 
            key={index} 
            to={`/cooks/${item.speciality}`}
          >
            <img 
              className="w-52 sm:w-48 mb-2 rounded-full" 
              src={item.image} 
              alt={item.speciality} 
            />
            <p className="flex justify-center text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenue;

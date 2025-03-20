/* eslint-disable react/prop-types */
import Input from "@molecules/Input.jsx";
import Button from "@atoms/Button.jsx";
import { CgSearch } from "react-icons/cg";

const DashSearchBar = ({ placeholder }) => {
  return (
    <span className="relative md:w-2/5 items-center">
      <Input
        name="email"
        type="search"
        // value={formData.email}
        // onChange={handleChange}
        // disabled={!isEditing}
        placeholder={placeholder}
        location="mt-0"
        className="pr-10"
      />
      <Button
        variant="toggle"
        icon={CgSearch}
        className="absolute right-1 -translate-y-[2.1rem] bg-transparent text-xl cursor-pointer pl-1 mr-1 border-l-2"
      />
    </span>
  );
};

export default DashSearchBar;

'use client';
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useSearchName } from "../Context/DoctorsFilter/SearchForName";

export default function SearchFormDoctor() {
  const searchNameContext = useSearchName();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchNameContext?.setSearchName(e.target.value);
  }

  return (
    <form>
      <div className="flex w-[300px] h-[33px]">
        <input
          onChange={handleChange}
          type="search"
          placeholder="Search For Doctor ..."
          name="search"
          className="rounded-tl-sm border border-form border-r-0 flex-1 px-2 focus:outline-none"
        />
        <IoIosSearch className="bg-mid-blue w-[40px] p-1 text-white rounded-sm rounded-tl-none rounded-bl-none h-full"/>
      </div>
    </form>
  );
}

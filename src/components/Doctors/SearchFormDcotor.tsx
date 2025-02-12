'use client';
import { IoIosSearch } from "react-icons/io";

export default function SearchFormDoctor() {
  return (
    <form action="">
      <div className="flex w-[300px] h-[33px]">
        <input
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

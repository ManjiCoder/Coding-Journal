import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setSearchQuery, setSearchSolution } from "@/redux-slices/Solution";
import { toast } from "react-toastify";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const fetchSearchResults = async (query) => {
    let toastId;
    if (toastId) {
      toast.dismiss(toastId);
    }
    let headersList = { "auth-token": Cookies.get("token") };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/search?q=${query}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    dispatch(setSearchSolution(data.solutions));

    if (data.solutions.length === 0) {
      return (toastId = toast.warn(data.message));
    }
    console.log("fetch-API Call", { data });
  };

  // For Debounced Search API Call
  useEffect(() => {
    let timer = setTimeout(() => {
      if (search.trim().length !== 0) {
        fetchSearchResults(search);
        dispatch(setSearchQuery(search.toLowerCase()));
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      dispatch(setSearchSolution([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <form
      className="flex pr-3 absolute right-16"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="search"
        name="search"
        className="rounded-full w-36 shadow-md bg-slate-100 p-1 px-3 outline-none"
        placeholder="Live - Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </form>
  );
}

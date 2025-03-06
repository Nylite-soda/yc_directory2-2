"use client";

import { X } from "lucide-react";
import LoadingLink from "./LoadingLink";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <LoadingLink href="/">
        <span className="search-btn text-white">
          <X className="size-5" />
        </span>
      </LoadingLink>
    </button>
  );
};

export default SearchFormReset;

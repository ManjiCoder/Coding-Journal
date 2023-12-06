import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Pagination() {
  const { solutions, page, limit, totalResults } = useSelector(
    (state) => state.solutions
  );
  const router = useRouter();

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`?page=${page - 1}`);
    }
  };

  const handleNext = () => {
    if (page * limit >= totalResults) return;
    router.push(`?page=${page + 1}`);
  };

  if (!solutions || solutions?.length === 0) return;
  return (
    <section className="flex justify-end gap-3 pr-10 pt-10">
      <button
        disabled={page === 1}
        className="w-32 bg-slate-800 disabled:bg-slate-700 hover:bg-slate-900 disabled:cursor-not-allowed rounded-md p-2 text-white"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        disabled={page * limit >= totalResults}
        className="w-32 bg-slate-800 disabled:bg-slate-700 hover:bg-slate-900 disabled:cursor-not-allowed rounded-md p-2 text-white"
        onClick={handleNext}
      >
        Next
      </button>
    </section>
  );
}

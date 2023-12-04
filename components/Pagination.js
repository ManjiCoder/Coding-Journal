import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Pagination() {
  const { solutions, limit, totalResults } = useSelector(
    (state) => state.solutions
  );

  const router = useRouter();
  let page = router.query.page;
  page = page ? parseInt(page) : 1;

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`?page=${page - 1}`);
    }
  };

  const handleNext = () => {
    // TODO: ADD LOGIC FOR NO DATA
    router.push(`?page=${page + 1}`);
  };

  if (!solutions || solutions?.length === 0) return;
  return (
    <section className="flex justify-end gap-3 pr-10">
      <button
        disabled={page === 1}
        className="w-32 bg-slate-800 disabled:bg-slate-700 hover:bg-slate-900 disabled:cursor-not-allowed rounded-md p-2 text-white"
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        // disabled={page * limit >= totalResults}
        className="w-32 bg-slate-800 disabled:bg-slate-700 hover:bg-slate-900 disabled:cursor-not-allowed rounded-md p-2 text-white"
        onClick={handleNext}
      >
        Next
      </button>
    </section>
  );
}

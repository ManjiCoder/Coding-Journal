import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Pagination() {
  const { solutions, limit, page, totalResults } = useSelector(
    (state) => state.solutions
  );

  //   const [pageArr, setPageArr] = useState([]);
  const router = useRouter();

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`?page=${page - 1}`);
    }
  };

  const handleNext = () => {
    if (page * limit <= totalResults) {
      router.push(`?page=${page + 1}`);
    }
  };
  //   const generterPageNo = () => {
  //     let fr = totalResults / (page * limit);
  //     let pageLen = Math.max(Math.floor(fr), Math.ceil(fr));
  //     let pages = [];
  //     for (let i = 1; i <= pageLen; i++) {
  //       pages.push(i);
  //     }
  //     pages = pages.slice(0, 2);
  //     setPageArr(pages);
  //   };
  //   useEffect(() => {
  //     generterPageNo();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  if (solutions.length === 0) return;
  return (
    <section className="flex justify-end gap-3 pr-10">
      <button
        disabled={page === 1}
        className="w-32 bg-slate-800 disabled:bg-slate-700 hover:bg-slate-900 disabled:cursor-not-allowed rounded-md p-2 text-white"
        onClick={handlePrevious}
      >
        Previous
      </button>
      {/* {pageArr.map((pageNo) => (
        <Button key={pageArr} pageNo={pageNo} />
      ))} */}
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

// export function Button({ pageNo }) {
//   const { page } = useSelector((state) => state.solutions);
//   const router = useRouter();
//   return (
//     <button
//       className={`min-w-[3rem] ${
//         pageNo === page ? 'bg-slate-900' : 'bg-slate-800'
//       } hover:bg-slate-900 disabled:cursor-not-allowed rounded-md p-2 text-white`}
//       onClick={() => {
//         router.push(`?page=${pageNo}`);
//       }}
//     >
//       {pageNo}
//     </button>
//   );
// }

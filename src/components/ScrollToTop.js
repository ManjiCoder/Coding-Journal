import React, { useEffect, useState } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const litenToScroll = () => {
    let heightToHidden = 250;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    // console.log(winScroll);
    if (winScroll >= heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", litenToScroll);
    return () => window.removeEventListener(litenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="bg-blue-800 w-12 h-12 rounded-full text-center p-3 fixed bottom-14 right-3"
          onClick={scrollToTop}
        >
          <i className="scroll-to-top text-white cursor-pointer text-2xl fa-solid fa-arrow-up"></i>
        </div>
      )}
    </>
  );
}

export default ScrollToTop;

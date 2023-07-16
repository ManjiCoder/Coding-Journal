"use client";

function Home() {
  if (!localStorage.getItem("token")) {
    return (
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        Demo
      </div>
    );
  }
  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      Home
    </div>
  );
}

export default Home;

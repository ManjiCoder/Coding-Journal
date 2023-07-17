import CardItem from "@/components/CardItem";
import { verify } from "@/middleware";
import { cookies } from "next/headers";

async function Home() {
  const isToken = cookies().get("token");
  if (!isToken) {
    return (
      <div class="flex min-h-[90vh] flex-col justify-center px-6 py-12 lg:px-8">
        Demo
      </div>
    );
  }
  const result = await verify(isToken.value, process.env.JWT_PRIVATE_KEY);
  console.log(result.userId.user);
  let headersList = {
    "auth-token": isToken.value,
  };

  let response = await fetch("http://localhost:3000/api/solutions/getall", {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);

  return (
    <div class="flex min-h-[90vh] flex-col justify-center px-6 py-12 lg:px-8">
      <CardItem data={data.solutions} />
    </div>
  );
}

export default Home;

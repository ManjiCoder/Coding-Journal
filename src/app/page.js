import CardItem from "@/components/CardItem";
import axios from "axios";

const url = `https://script.google.com/macros/s/AKfycbyerC-F20IUhaCOri76oLGSYJPMj7AsIxVfp2oxTAETi1kAE_qFIcW0nFLT-_6jI1c3aw`;

async function page() {
  const { data } = await axios
    .get(`${url}/exec?query=${"manjicoder"}`)
    .catch((error) => {
      console.log(error);
    });

  return (
    <div>
      <CardItem data={data} />
    </div>
  );
}

export default page;

import Image from "next/image";
import Hero from "./(component)/Hero";
import Cards from "./(component)/Cards";
import Info from "./Info";
import Blogs from "./(component)/Blogs";
import Banner from "./(component)/Banner";
import Portf from "./(component)/Portf";
import Se1 from "./(component)/Se1";
import Se2 from "./(component)/Se2";
export default function Home() {
  return (
    <div className="">
     
      <Banner/>
      <Blogs/>
      <Se1/>
      <Info/>
      <Se2/>
      <Cards/>
      <Portf/>
    </div>
  );
}

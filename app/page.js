import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center text-3xl flex-col justify-center">
      <h2> Get Started To Explore! </h2>
      <Link href={'/dashboard'}> 
    <Button>Get Started</Button>
      </Link>
    </div>
  );
}

"use client";

import { useUser } from "../hooks/getUser";
import Link from "next/link";

export default function Home() {
  const user = useUser();
  return (
    <>
      {user ? (
        <div>
          GO TO
          <Link className="text-blue-600 ml-1 hover:text-blue-500 hover:underline active:text-blue-800" href={"/dashboard"}>DASHBOARD</Link>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

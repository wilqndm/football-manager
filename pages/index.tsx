import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("isAdmin") === "true") {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [router]);
  return null;
}
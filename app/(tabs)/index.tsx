import RequestComp from "@/components/RequestComp";
import axios from "axios";
import { useEffect } from "react";

export default function HomeScreen() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://tago.cash/api/faqs");
        console.log("API response:", response.data);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);
  return <RequestComp />;
}

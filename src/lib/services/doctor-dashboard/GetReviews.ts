"use client"
import axios from "axios";
import GetToken from "../auth/GetToken";

export const getReviews = async () => {
    const token = await GetToken()
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      return res.data.length
    } catch (error) {
      console.error("Error fetching data!", error);

    }
  };

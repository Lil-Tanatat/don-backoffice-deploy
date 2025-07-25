import type { NextApiRequest, NextApiResponse } from "next";
import { Province, ProvinceResponse } from "@/types/location";
import locationData from "../../../public/data/location.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProvinceResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed",
      data: [],
      total: 0,
    });
  }

  try {
    const mappedProvinces = locationData.map((item, index) => ({
      //   uid: index + 1,
      id: parseInt(item.provinceId),
      name: item.province,
    }));

    const uniqueProvinces = mappedProvinces.reduce(
      (acc: Map<number, Province>, province: Province) => {
        if (!acc.has(province.id)) {
          acc.set(province.id, province);
        }
        return acc;
      },
      new Map<number, Province>()
    );

    const provinces = Array.from(uniqueProvinces.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "th")
    );

    //response
    res.status(200).json({
      status: "success",
      data: provinces,
      total: provinces.length,
    });
  } catch (error) {
    // console.error("Error fetching provinces:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: [],
      total: 0,
    });
  }
}

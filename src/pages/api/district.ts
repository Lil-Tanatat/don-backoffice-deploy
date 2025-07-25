import type { NextApiRequest, NextApiResponse } from "next";
import { District, DistrictResponse } from "@/types/location";
import locationData from "../../../public/data/location.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DistrictResponse>
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
    const { provinceId } = req.query;

    const mappedDistricts = locationData.map((item) => ({
      id: parseInt(item.districtId),
      name: item.district,
      provinceId: parseInt(item.provinceId),
    }));

    const filteredDistricts = provinceId
      ? mappedDistricts.filter(
          (district) => district.provinceId === parseInt(provinceId as string)
        )
      : mappedDistricts;

    const uniqueDistrictsMap = filteredDistricts.reduce(
      (acc: Map<number, District>, district: District) => {
        if (!acc.has(district.id)) {
          acc.set(district.id, district);
        }
        return acc;
      },
      new Map<number, District>()
    );

    const districts = Array.from(uniqueDistrictsMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "th")
    );

    res.status(200).json({
      status: "success",
      data: districts,
      total: districts.length,
    });
  } catch (error) {
    // console.error("Error fetching districts:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: [],
      total: 0,
    });
  }
}

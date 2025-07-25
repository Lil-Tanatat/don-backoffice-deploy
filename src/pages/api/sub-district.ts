import type { NextApiRequest, NextApiResponse } from "next";
import { SubDistrict, SubDistrictResponse } from "@/types/location";
import locationData from "../../../public/data/location.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubDistrictResponse>
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
    const { districtId } = req.query;

    const mappedSubDistricts = locationData.map((item) => ({
      id: item.subDistrictId,
      name: item.subDistrict,
      districtId: parseInt(item.districtId),
      provinceId: parseInt(item.provinceId),
      postcode: item.zip_code.toString(),
    }));

    const filteredSubDistricts = districtId
      ? mappedSubDistricts.filter(
          (subdistrict) =>
            subdistrict.districtId === parseInt(districtId as string)
        )
      : mappedSubDistricts;

    const uniqueSubDistrictsMap = filteredSubDistricts.reduce(
      (acc: Map<number, SubDistrict>, subdistrict: SubDistrict) => {
        if (!acc.has(subdistrict.id)) {
          acc.set(subdistrict.id, subdistrict);
        }
        return acc;
      },
      new Map<number, SubDistrict>()
    );

    const subDistricts = Array.from(uniqueSubDistrictsMap.values()).sort(
      (a, b) => a.name.localeCompare(b.name, "th")
    );

    res.status(200).json({
      status: "success",
      data: subDistricts,
      total: subDistricts.length,
    });
  } catch (error) {
    // console.error("Error fetching subDistricts:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: [],
      total: 0,
    });
  }
}

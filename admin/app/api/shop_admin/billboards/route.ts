import { NextResponse } from "next/server";
import { linkCustomer, HTTP_request_method_Get } from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(request: Request) {
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_billboards.getAllBillboards,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (response.ok) {
      const data = await response.json();

      return NextResponse.json({ status: "Success", data }, { status: 200 });
    } else {
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving billboards:", error);
    console.error("Billboards nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, ImageUrls } = body;
    console.log("admin/app/api/shop_admin/billboards/route.ts", body);
    if (!name || !ImageUrls) {
      return new NextResponse("Label and ImageUrl are required", {
        status: 400
      });
    }

    // const billboardsAvailable = await fetch(
    //   `${link.golang_Base}${link.routes_billboards.findBillboardByLabel}?label=${Label}`,
    //   HTTP_request_method_Get
    // );
    // console.log(
    //   "this is service of billboard api/shop_admin/billboards after fetching"
    // );
    // const body1 = await billboardsAvailable.json();
    // const test = body1.data;
    // console.log(
    //   "this is service of billboard api/shop_admin/billboards after fetching data response in case billboar is not availbale",
    //   test
    // );

    // if (test === "Billboard not found") {
    console.log(
      "admin/app/api/shop_admin/billboards/route.ts this is inside billboar not found"
    );
    console.log(name, ImageUrls);
    const Label = name;
    const ImageUrl = ImageUrls;
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_billboards.createBillboard}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Label, ImageUrl })
      }
    );

    if (response.ok && response.status === 201) {
      const data = await response.json();
      console.log("this is data response trong billboards route post ", data);
      return new NextResponse(
        JSON.stringify({ status: "Billboard Created", data }),
        { status: 201 }
      );
    } else {
      const data = await response.json();
      console.log("Received unexpected status code:", response.status, data);
      return new NextResponse(
        JSON.stringify({
          status: "Failed",
          message: data.message || "Unexpected error"
        }),
        { status: response.status }
      );
    }
    // } else {
    //   return new NextResponse("Billboard already exists", { status: 200 });
    // }
  } catch (error) {
    console.error("An error occurred while creating the billboard:", error);
    return new NextResponse(
      JSON.stringify({ status: "Failed", message: "Internal server error" }),
      { status: 500 }
    );
  }
}

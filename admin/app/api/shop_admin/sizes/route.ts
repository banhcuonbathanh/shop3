import { NextResponse } from "next/server";
import { linkCustomer, HTTP_request_method_Get } from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(request: Request) {
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_size.getAllSizes,
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
    console.error("An error occurred while retrieving sizes:", error);
    console.error("Sizes nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  console.log("this is servise of size api/shop_admin/size");
  try {
    const body = await req.json();
    const { name, value } = body;
    console.log("this is servise of size api/shop_admin/size", body);
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    console.log("this is servise of size api/shop_admin/size1111");
    const sizesAvailable = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_size.findSizeByName}?name=${name}`,
      HTTP_request_method_Get
    );
    console.log("this is servise of size api/shop_admin/siz22222");
    const body1 = await sizesAvailable.json();
    const test = body1.data;
    console.log(
      "this is servise of size api/shop_admin/siz22222testtesttest",
      test
    );
    if (test === "Size not found") {
      const response = await fetch(
        `${linkCustomer.golang_Base}${linkCustomer.routes_size.createSize}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, value })
        }
      );

      if (response.ok && response.status === 201) {
        // Size was created successfully
        const data = await response.json();
        return new NextResponse(
          JSON.stringify({ status: "Size Created", data }),
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
    } else {
      return new NextResponse("Size already exists", { status: 200 });
    }
  } catch (error) {
    console.error("An error occurred while creating the size:", error);
    return new NextResponse(
      JSON.stringify({ status: "Failed", message: "Internal server error" }),
      { status: 500 }
    );
  }
}

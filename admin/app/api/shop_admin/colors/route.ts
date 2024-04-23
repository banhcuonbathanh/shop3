import { NextResponse } from "next/server";
import { linkCustomer, HTTP_request_method_Get } from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(request: Request) {
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_color.getAllColors,
      {
        // Updated route
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
    console.error("An error occurred while retrieving colors:", error);
    console.error("Colors nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  console.log("this is service of color api/shop_admin/color"); // Updated log message
  try {
    const body = await req.json();
    const { name, value } = body;
    console.log("this is service of color api/shop_admin/color", body); // Updated log message
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    console.log("this is service of color api/shop_admin/color1111"); // Updated log message
    const colorsAvailable = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_color.findColorByName}?name=${name}`, // Updated route
      HTTP_request_method_Get
    );
    console.log("this is service of color api/shop_admin/color22222"); // Updated log message
    const body1 = await colorsAvailable.json();
    const test = body1.data;
    console.log(
      "this is service of color api/shop_admin/color22222testtesttest", // Updated log message
      test
    );
    if (test === "Color not found") {
      const response = await fetch(
        `${linkCustomer.golang_Base}${linkCustomer.routes_color.createColor}`, // Updated route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, value })
        }
      );

      if (response.ok && response.status === 201) {
        // Color was created successfully
        const data = await response.json();
        return new NextResponse(
          JSON.stringify({ status: "Color Created", data }),
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
      return new NextResponse("Color already exists", { status: 200 });
    }
  } catch (error) {
    console.error("An error occurred while creating the color:", error);
    return new NextResponse(
      JSON.stringify({ status: "Failed", message: "Internal server error" }),
      { status: 500 }
    );
  }
}

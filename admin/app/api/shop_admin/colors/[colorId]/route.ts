import { NextResponse, NextRequest } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";
import {
  linkCustomer,
  HTTP_request_method_Get,
  HTTP_request_method_Delete
} from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.body;

  try {
    console.log(" this is inside shop admin component route");
    console.log(baseUrl + linkCustomer.routes_color.getColorById + id); // Updated route
    const response = await fetch(
      baseUrl + linkCustomer.routes_color.getColorById + id, // Updated route
      HTTP_request_method_Get
    );
    console.log("response");
    console.log(await response.json());
    console.log(response);
    if (response.ok) {
      console.log(" this is inside shop admin component route okokokokokkkok");
      const data = await response.json();

      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json" // Set the appropriate content type
        }
      });
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

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string } } // Update "categoryId" to "colorId"
) {
  console.log(" this is delete color component 11"); // Update "category" to "color"
  try {
    if (!params.colorId) {
      // Update "categoryId" to "colorId"
      return new NextResponse("Color id is required", { status: 400 }); // Update message
    }
    console.log(" this is delete color component 22"); // Update "category" to "color"
    // Make a DELETE request to delete the color by its ID
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_color.deleteColor}${params.colorId}`, // Updated route
      HTTP_request_method_Delete
    );
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_color.deleteColor}${params.colorId}`
    );
    console.log(" this is delete color component 33"); // Update "category" to "color"

    if (response.ok) {
      console.log(" this is delete color component 44"); // Update "category" to "color"
      const color = await response.json(); // Update variable name
      return NextResponse.json(color, { status: 200 }); // Update variable name
    } else {
      console.log(" this is delete color component 55"); // Update "category" to "color"
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[COLOR_DELETE]", error); // Update "[CATEGORY_DELETE]" to "[COLOR_DELETE]"
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string } } // Update "categoryId" to "colorId"
) {
  try {
    // Assuming you have implemented the 'auth()' function
    console.log("This is inside color PATCH api/shop admin/color"); // Updated log message
    const body = await req.json();
    console.log("This is inside color PATCH: Request Body", body); // Updated log message
    const { name, value } = body; // Update variable names to match your request body

    if (!name || !value) {
      return new NextResponse("Name and Value are required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 }); // Updated message
    }
    console.log("This is inside color PATCH: Request Body11111");
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_color.updateColor}${params.colorId}` // Updated route
    );
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_color.updateColor}${params.colorId}`, // Updated route
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, value }) // Send the updated name and value
      }
    );

    if (response.ok) {
      const color = await response.json(); // Update variable name
      return new NextResponse(JSON.stringify(color), { status: 200 }); // Update variable name
    } else {
      const data = await response.json();
      console.error(
        "Received an unexpected status code:",
        response.status,
        data
      );
      return new NextResponse(
        JSON.stringify({
          status: "Failed",
          message: data.message || "Unexpected error"
        }),
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[COLOR_PATCH]", error); // Updated log message
    return new NextResponse("Internal error", { status: 500 });
  }
}
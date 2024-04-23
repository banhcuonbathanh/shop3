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
    console.log(baseUrl + linkCustomer.routes_size.getSizeById + id);
    const response = await fetch(
      baseUrl + linkCustomer.routes_size.getSizeById + id,
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
    console.error("An error occurred while retrieving sizes:", error);
    console.error("Sizes nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string } } // Update "categoryId" to "sizeId"
) {
  console.log(" this is delete size component 11"); // Update "category" to "size"
  try {
    if (!params.sizeId) {
      // Update "categoryId" to "sizeId"
      return new NextResponse("Size id is required", { status: 400 }); // Update message
    }
    console.log(" this is delete size component 22"); // Update "category" to "size"
    // Make a DELETE request to delete the size by its ID
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_size.deleteSize}${params.sizeId}`, // Update route
      HTTP_request_method_Delete
    );
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_size.deleteSize}${params.sizeId}`
    );
    console.log(" this is delete size component 33"); // Update "category" to "size"

    if (response.ok) {
      console.log(" this is delete size component 44"); // Update "category" to "size"
      const size = await response.json(); // Update variable name
      return NextResponse.json(size, { status: 200 }); // Update variable name
    } else {
      console.log(" this is delete size component 55"); // Update "category" to "size"
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[SIZE_DELETE]", error); // Update "[CATEGORY_DELETE]" to "[SIZE_DELETE]"
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    // Assuming you have implemented the 'auth()' function
    console.log("This is inside size PATCH api/shop admin/size");
    const body = await req.json();
    console.log("This is inside size PATCH: Request Body", body);
    const { name, value } = body; // Update variable names to match your request body

    if (!name || !value) {
      return new NextResponse("Name and Value are required", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }
    console.log("This is inside size PATCH: Request Body11111");
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_size.updateSize}${params.sizeId}`
    );
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_size.updateSize}${params.sizeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, value }) // Send the updated name and value
      }
    );

    if (response.ok) {
      const size = await response.json();
      return new NextResponse(JSON.stringify(size), { status: 200 });
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
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";
import {
  linkCustomer,
  HTTP_request_method_Get,
  HTTP_request_method_Delete
} from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(
    "This is inside shop admin product detail  component route",
    req.body
  );
  const id = req.body;

  try {
    console.log(baseUrl + linkCustomer.routes_products.getProductById + id); // Updated route
    const response = await fetch(
      baseUrl + linkCustomer.routes_products.getProductById + id,
      HTTP_request_method_Get
    );
    console.log("response product compoent []");
    console.log(await response.json());
    console.log(response);
    if (response.ok) {
      console.log("This is inside shop admin component route okokokokokkkok");
      const data = await response.json();

      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
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
    console.error("An error occurred while retrieving products:", error);
    console.error("Products nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  console.log("This is delete product component 11");
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    console.log("This is delete product component 22");
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.deleteProduct}${params.productId}`,
      HTTP_request_method_Delete
    );
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.deleteProduct}${params.productId}`
    );
    console.log("This is delete product component 33");

    if (response.ok) {
      console.log("This is delete product component 44");
      const product = await response.json();
      return NextResponse.json(product, { status: 200 });
    } else {
      console.log("This is delete product component 55");
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    console.log("This is inside product PATCH api/shop admin/product");
    const body = await req.json();
    console.log("This is inside product PATCH: Request Body", body);
    const {
      name,
      ImageUrls,
      Price,
      CategoryId,
      ColorId,
      SizeId,
      IsFeatured,
      IsArchived
    } = body;

    const categoryIdInt = parseInt(CategoryId, 10);
    const colorIdInt = parseInt(ColorId, 10);
    const sizeIdInt = parseInt(SizeId, 10);
    if (
      !name ||
      !ImageUrls ||
      !Price ||
      isNaN(categoryIdInt) || // Check if it's a valid integer
      isNaN(colorIdInt) || // Check if it's a valid integer
      isNaN(sizeIdInt) || // Check if it's a valid integer
      typeof IsFeatured === "undefined" ||
      typeof IsArchived === "undefined"
    ) {
      return new NextResponse("Name and ImageUrl are required", {
        status: 400
      });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    console.log("This is inside product PATCH: Request Body11111222");
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.updateProduct}`
    );
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.updateProduct}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          ImageUrls,
          Price,
          CategoryId: categoryIdInt, // Use the parsed integer
          ColorId: colorIdInt, // Use the parsed integer
          SizeId: sizeIdInt, // Use the parsed integer
          IsFeatured,
          IsArchived
        })
      }
    );
    if (response.ok) {
      const product = await response.json();
      return new NextResponse(JSON.stringify(product), { status: 200 });
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
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

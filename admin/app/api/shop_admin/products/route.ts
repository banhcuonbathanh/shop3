import { NextResponse } from "next/server";
import { linkCustomer, HTTP_request_method_Get } from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(request: Request) {
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_products.getAllProducts, // Update the route for getting all products
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(
        " this is get all product trong api link",
        baseUrl + linkCustomer.routes_products.getAllProducts
      );
      console.log(" this is get all product trong api p", data);
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
    console.error("An error occurred while retrieving products:", error);
    console.error("Products nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    // Parse CategoryId, ColorId, and SizeId as integers
    const categoryIdInt = parseInt(CategoryId, 10);
    const colorIdInt = parseInt(ColorId, 10);
    const sizeIdInt = parseInt(SizeId, 10);

    console.log("this is service of product api/shop_admin/products", body);

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
      return new NextResponse(
        "Product details are incomplete. All fields (name, ImageUrl, Price, CategoryName, ColorName, SizeName, IsFeatured, IsArchived) are required",
        {
          status: 400
        }
      );
    }

    // const productsAvailable = await fetch(
    //   `${link.golang_Base}${link.routes_products.findProductsByName}?name=${name}`,
    //   { method: "GET" }
    // );
    // console.log("this is service of product 222222");
    // const body1 = await productsAvailable.json();
    // const test = body1.data;

    // if (Array.isArray(test) && test.length === 0) {
    console.log(
      " this is jsonnnnnnnnnasdfasfasdfasfs",
      JSON.stringify({
        name,
        ImageUrls,
        Price,
        CategoryId: categoryIdInt, // Use the parsed integer
        ColorId: colorIdInt, // Use the parsed integer
        SizeId: sizeIdInt, // Use the parsed integer
        IsFeatured,
        IsArchived
      })
    );
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.createProduct}`,
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
    console.log(" this is inside create product before if ");
    if (response.ok && response.status === 201) {
      const data = await response.json();

      console.log(" this is create product api post ", data);
      return new NextResponse(
        JSON.stringify({ status: "Product Created", data }),
        { status: 201 }
      );
    } else {
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return new NextResponse(
        JSON.stringify({
          status: "Failed",
          message: data.message || "Unexpected error"
        }),
        { status: response.status }
      );
    }
    // } else {
    //   return new NextResponse("Product already exists", { status: 200 });
    // }
  } catch (error) {
    console.error("An error occurred while creating the product:", error);
    return new NextResponse(
      JSON.stringify({ status: "Failed", message: "Internal server error" }),
      { status: 500 }
    );
  }
}

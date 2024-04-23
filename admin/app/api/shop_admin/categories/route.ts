import { NextResponse } from "next/server";

// test -----------------------------------
import { linkCustomer, HTTP_request_method_Get } from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(request: Request) {
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_categories.getAllCategories,
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
    console.error("An error occurred while retrieving categories:", error);
    console.error("Categories nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

// test -----------------------------------
export async function POST(req: Request) {
  console.log("This is inside POST API category server");
  try {
    const body = await req.json();
    const { Name } = body;

    if (!Name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const categoriesAvailable = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_categories.findByCategoryName}?Name=${Name}`,
      HTTP_request_method_Get
    );

    const body1 = await categoriesAvailable.json();
    const test = body1.data;

    if (test === "Category not found") {
      const response = await fetch(
        `${linkCustomer.golang_Base}${linkCustomer.routes_categories.createCategory}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ Name })
        }
      );

      if (response.ok && response.status === 201) {
        // Category was created successfully
        const data = await response.json();
        return new NextResponse(
          JSON.stringify({ status: "Categories Created", data }),
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
      return new NextResponse("Category already exists", { status: 200 });
    }
  } catch (error) {
    console.error("An error occurred while creating the categories:", error);
    console.error("Categories Node.js server");
    return new NextResponse(
      JSON.stringify({ status: "Failed", message: "Internal server error" }),
      { status: 500 }
    );
  }
}

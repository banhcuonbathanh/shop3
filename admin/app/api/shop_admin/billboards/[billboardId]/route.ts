import { NextResponse, NextRequest } from "next/server";

import {
  linkCustomer,
  HTTP_request_method_Get,
  HTTP_request_method_Delete
} from "@/lib/config";

const baseUrl = linkCustomer.golang_Base;

export async function GET(req: NextRequest, res: NextResponse) {
  // const { id } = req.body;
  const id = req.body;
  try {
    console.log(" this is inside shop admin component route");
    console.log(baseUrl + linkCustomer.routes_billboards.getBillboardById + id); // Updated route
    const response = await fetch(
      baseUrl + linkCustomer.routes_billboards.getBillboardById + id,
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
    console.error("An error occurred while retrieving billboards:", error);
    console.error("Billboards nodejs server");
    return NextResponse.json(
      { status: "Failed", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  console.log(" this is delete billboard component 11");
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }
    console.log(" this is delete billboard component 22");
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_billboards.deleteBillboard}${params.billboardId}`,
      HTTP_request_method_Delete
    );
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_billboards.deleteBillboard}${params.billboardId}`
    );
    console.log(" this is delete billboard component 33");

    if (response.ok) {
      console.log(" this is delete billboard component 44");
      const billboard = await response.json();
      return NextResponse.json(billboard, { status: 200 });
    } else {
      console.log(" this is delete billboard component 55");
      const data = await response.json();
      console.error("Received unexpected status code:", response.status, data);
      return NextResponse.json(
        { status: "Failed", message: data.message || "Unexpected error" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    console.log("This is inside billboard PATCH api/shop admin/billboard");
    const body = await req.json();
    console.log("This is inside billboard PATCH: Request Body", body);
    const { Label, ImageUrl } = body;

    if (!Label || !ImageUrl) {
      return new NextResponse("Label and ImageUrl are required", {
        status: 400
      });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }
    console.log("This is inside billboard PATCH: Request Body11111");
    console.log(
      `${linkCustomer.golang_Base}${linkCustomer.routes_billboards.updateBillboard}${params.billboardId}`
    );
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_billboards.updateBillboard}${params.billboardId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Label, ImageUrl })
      }
    );

    if (response.ok) {
      const billboard = await response.json();
      return new NextResponse(JSON.stringify(billboard), { status: 200 });
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
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { SizesClient } from "./components/client";
import { get_Size_Shop } from "./size-controller/size-controller";

const SizesPage = async () => {
  const sizesData = await get_Size_Shop();

  // console.log("admin/app/(route)/sizes/page.tsx", sizesData);
  return (
    <div className="flex-col">
      <p>size page</p>
      <SizesClient
        data={sizesData === null || sizesData === undefined ? [] : sizesData}
      />
    </div>
  );
};

export default SizesPage;

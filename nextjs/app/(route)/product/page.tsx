// import BillboardPage from "../component/billboard/billboard";

import Container from "@/components/ui/container";
import BillboardPage from "./component/billboard/billboard";
import { get_Billboard_Shop } from "./controller-product/controller-product";
import ProductList from "./component/product/product-list";
import ChatPage from "../chat/chat";

// import { get_Billboard_Shop } from "../controller/home-controller";

// import Container from "@/components/ui/container";

// import Flyout_Link from "@/components/hover.dev/Flyout_Link";

const HomePageShop = async () => {
  // const billboard = await get_Billboard_Shop();

  return (
    <Container>
      <div className="space-y-10 pb-10 container mx-auto px-2 relative">
        {/* <BillboardPage data={billboard[0]} /> */}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {/* <ProductList /> */}
        </div>

        <ChatPage />
      </div>
    </Container>
  );
};

export default HomePageShop;

{
  /* <h1>tests</h1>
        <iframe
          width="500"
          height="1000"
          id="test123123"
          // src="https://tinhte.vn/"
          src="https://www.bing.com/"
          // src="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx"
          title="Example Website"
        ></iframe> */
}

{
  /* <Image
            src={profilePic}
            alt="Picture of the author"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          /> */
}

// ----------------------
// const [billboarnpmdsData, setBillboardsData] = useState<Billboard[]>([]);
// const [loading, setLoading] = useState(true);
// const fetchBillboards = async () => {
//   console.log("This is fetchBillboards");

//   try {
//     const response = await axios.get(
//       link_internal.routes_shop_admin_billboards.billboardid
//     );

//     const test = response.data.data.data;

//     if (response.data.data.data !== null) {
//       const transformedData: Billboard[] = test.map((item: Billboard) => ({
//         imageUrl: item.imageUrl,
//         id: item.id.toString(),
//         label: item.label,
//         createdAt: item.createdAt // Add 'createdAt' field if available in the response
//       }));

//       setBillboardsData(transformedData);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   console.log(
//     "insede useeffect in HomePageShop lengthe of billboarnpmdsData.length ",
//     billboarnpmdsData.length,
//     billboarnpmdsData
//   );
//   if (billboarnpmdsData.length === 0) {
//     fetchBillboards();
//   }
// }, [billboarnpmdsData]);

//-----------------

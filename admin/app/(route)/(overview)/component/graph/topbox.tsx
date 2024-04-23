import Image from "next/image";

const TopBox = () => {
  return (
    <div className="mb-8 border border-cyan-50 p-6 rounded-sm">
      <h1 className="mb-5 text-2xl lg:text-4xl">Top Deals</h1>
      <div>
        {topDealUsers.map((user) => (
          <div className="flex justify-between mb-7" key={user.id}>
            <div className="flex gap-5">
              {/* <Image
                src={user.img}
                alt=""
                height={10}
                width={50}
                className=" w-10 h-10 rounded-full custom-position"
              /> */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{user.username}</span>
                <span className="text-xs lg:hidden xxl:block">
                  {user.email}
                </span>
              </div>
            </div>
            <span className="font-medium">${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
//
export default TopBox;
type TopDealUsers = {
  id: number;
  img: string;
  username: string;
  email: string;
  amount: string;
};
const topDealUsers: TopDealUsers[] = [
  {
    id: 1,
    img: "/orange.png",
    username: "Elva McDonald",
    email: "elva@gmail.com",
    amount: "3.668"
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Linnie Nelson",
    email: "linnie@gmail.com",
    amount: "3.256"
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Brent Reeves",
    email: "brent@gmail.com",
    amount: "2.998"
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Adeline Watson",
    email: "adeline@gmail.com",
    amount: "2.512"
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Juan Harrington",
    email: "juan@gmail.com",
    amount: "2.134"
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Augusta McGee",
    email: "augusta@gmail.com",
    amount: "1.932"
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Angel Thomas",
    email: "angel@gmail.com",
    amount: "1.560"
  }
];

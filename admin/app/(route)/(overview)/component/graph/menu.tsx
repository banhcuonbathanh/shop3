import Link from "next/link";
import Image from "next/image";
interface ListItem {
  id: number;
  title: string;
  url: string;
  icon: string;
}

interface MenuData {
  id: number;
  title: string;
  listItems: ListItem[];
}
//

const menu: MenuData[] = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "home.svg"
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "user.svg"
      }
    ]
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: "/users",
        icon: "user.svg"
      },
      {
        id: 2,
        title: "Products",
        url: "/products",
        icon: "product.svg"
      },
      {
        id: 3,
        title: "Orders",
        url: "/orders",
        icon: "order.svg"
      },
      {
        id: 4,
        title: "Posts",
        url: "/posts",
        icon: "post2.svg"
      }
    ]
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: "element.svg"
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "note.svg"
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: "form.svg"
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: "calendar.svg"
      }
    ]
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting.svg"
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "backup.svg"
      }
    ]
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "chart.svg"
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "log.svg"
      }
    ]
  }
];

const Menu = () => {
  return (
    <div className="border-r border-gray-300 pr-6 ">
      {menu.map((item) => (
        <div className="item flex flex-col gap-10 mb-20 " key={item.id}>
          <span className=" text-xs ">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link href={listItem.url} key={listItem.id}>
              <div className="flex flex-row ">
                <Image
                  src={listItem.icon}
                  alt=""
                  height={10}
                  width={50}
                  className=" w-10 h-10 rounded-full custom-position"
                />
                <span className="pl-5">{listItem.title}</span>
              </div>

              {/* <div className="listItem flex items-center gap-10 p-10 rounded-md hover:bg-soft-bg">
                <img src={listItem.icon} alt="" />
                <span className="listItemTitle lg:hidden">
                  {listItem.title}
                </span>
              </div> */}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;

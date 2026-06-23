import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image"; // Changed: Import Image directly from 'next/image' instead of the whole 'next' module
import SidebarUserInfo from "@/app/Components/SidebarUserInfo";

// ...existing code...

const Sidebar = () => {
  return (
    <nav className=" hidden sm:flex flex-col h-screen items-center sticky top-0 w-[100px] xl:w-1/6   xl:ml-20 text-gray-700">
      <div className="relative h-full">
        <div className="sm:ml-3">
          <div className="mt-8 mb-4   ">
            <Image
              className="xl:hidden sm:ml-[-6px]"
              src="/assets/logo1.png"
              width={75}
              height={75}
              alt={"logo"}
            />
            <Image
              className="hidden xl:block"
              src="/assets/logo3.png"
              width={140}
              height={95}
              alt={"logo"}
            />
          </div>
          <ul className="flex flex-col ml-4 xl:ml-0 gap-5 mt- mb-4">
            <SidebarLink text="Home" Icon={HomeIcon} />
            <SidebarLink text="Explore" Icon={HashtagIcon} />
            <SidebarLink text="Notifications" Icon={BellIcon} />
            <SidebarLink text="Messages" Icon={InboxIcon} />
            <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarLink text="Profile" Icon={UserIcon} />
            <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
          </ul>
        </div>
        <SidebarUserInfo />
      </div>
    </nav>
  );
};

interface SidebarLinkProps {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

// ...existing code...
function SidebarLink({ text, Icon }: SidebarLinkProps) {
  return (
    <div className="flex gap-3 text-lg font-medium mt-2 cursor-pointer">
      {Icon && <Icon className="h-6 w-6 " />}
      <span className="hidden xl:block">{text}</span>
    </div>
  );
}
export default Sidebar;

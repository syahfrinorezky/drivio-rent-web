import { IconType } from "react-icons";
import { IoHome, IoCar, IoMail, IoHomeOutline, IoCarOutline, IoMailOutline } from "react-icons/io5";

interface NavigationItem {
  name: string;
  href: string;
  icon?: IconType;
  iconActive?: IconType;
}

export const NAVIGATION_PUBLIC: NavigationItem[] = [
  { name: "Home", href: "/", icon: IoHomeOutline, iconActive: IoHome },
  { name: "Vehicle", href: "/vehicle", icon: IoCarOutline, iconActive: IoCar },
  { name: "Contact", href: "/contact", icon: IoMailOutline, iconActive: IoMail },
];

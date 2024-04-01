import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdOutlineGroups } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { IoCarOutline } from "react-icons/io5";
import { IoMapOutline } from "react-icons/io5";
import { IoPartlySunnyOutline } from "react-icons/io5";
const links = [
  {
    id: 1,
    text: "stats",
    path: "/dashboard",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Itinerary Records",
    path: "all-records",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add Itinerary Record",
    path: "add-record",
    icon: <FaWpforms />,
  },

  {
    id: 5,
    text: "Trip Group",
    path: "group",
    icon: <MdOutlineGroups />,
  },
  {
    id: 6,
    text: "Book Accommodation",
    path: "accommodation",
    icon: <RiHotelLine />,
  },
  {
    id: 7,
    text: "Book Transportation",
    path: "transportation",
    icon: <IoCarOutline />,
  },
  {
    id: 8,
    text: "Map",
    path: "map",
    icon: <IoMapOutline />,
  },
  {
    id: 8,
    text: "Weather",
    path: "weather",
    icon: <IoPartlySunnyOutline />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HikingIcon from "@mui/icons-material/Hiking";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import HotelIcon from "@mui/icons-material/Hotel";

const monitoringList = [
  {
    title: "달리기",
    score: 60,
    icon: <DirectionsRunIcon fontSize="large" />,
    color: "bg-yellow-500",
  },
  {
    title: "등산",
    score: 2,
    icon: <HikingIcon fontSize="large" />,
    color: "bg-green-500",
  },
  {
    title: "외식",
    score: 3,
    icon: <LocalDiningIcon fontSize="large" />,
    color: "bg-red-500",
  },
  {
    title: "수면",
    score: 4.75,
    icon: <HotelIcon fontSize="large" />,
    color: "bg-blue-500",
  },
];

export default function Monitoring() {
  return (
    <div className="px-2 py-4 flex flex-wrap">
      {monitoringList.map((item) => (
        <div
          key={item.title}
          className="mx-4 flex-col grow bg-white drop-shadow-lg rounded-lg"
        >
          <div className="flex p-4">
            <div
              className={`mr-6 w-10 h-10 p-2 rounded-lg text-white flex items-center justify-center drop-shadow-lg ${item.color}`}
            >
              {item.icon}
            </div>
            <div className="flex-col items-start">
              <h5 className="text-gray-500">{item.title}</h5>
              <h2 className="text-3xl">{item.score}</h2>
            </div>
          </div>
          <div className="p-2 border-solid border-0 border-t-[1px] border-slate-300 text-right text-sm text-gray-400 ">
            <span className="hover:text-gray-600 cursor-pointer">
              상세보기➡
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

import Link from "next/link";
import userImage from "@assets/img.jpg";
import bell from "@assets/bell.png";
import loading from "@assets/loading.png";
import next from "@assets/next.png";
import home from "@assets/home.png";
import boards from "@assets/boards.png";
import setting from "@assets/setting.png";
import team from "@assets/team.png";
import ana from "@assets/ana.png";
import buttonIcon from "@assets/buttonIcon.png";
import downloadIcon from "@assets/downloadIcon.png";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
interface props {
  userName: string;
  toggleDrawer: () => void;
}

export default function Sidebar({ userName, toggleDrawer }: props) {
  const router = useRouter();
  const handleSignout = () => {
    deleteCookie("token");
    deleteCookie("user");
    router.push("/login");
  };
  return (
    <div
      className="w-[285px] h-screen flex flex-col gap-[16px] justify-between"
      style={{ padding: "24px 16px 32px 16px" }}
    >
      <div className="h-[363px] flex flex-col gap-[16px]">
        {/* user info sidebar */}
        <div className=" h-[79px] w-[253px] grid gap-[8px]">
          <div className="flex items-center w-[253px] ">
            <div className="h-[31px] w-[31px]">
              <Image alt="img" src={userImage} className="h-full rounded-[8px]"></Image>
            </div>
            <div>
              <p className="text-[20px] font-[500] pl-2">{userName}</p>
            </div>
          </div>
          <div className="h-[40px] w-[253px] justify-between flex items-center">
            <div className="h-[24px] flex w-[112px] gap-[20px]">
              <Image alt="img" src={bell} className="h-full w-[24px]"></Image>
              <Image alt="img" src={loading} className="h-full w-[24px]"></Image>
              <Image alt="img" src={next} className="h-full w-[24px]"></Image>
            </div>
            <div className="w-[69px] h-[40px] bg-[#DEDEDE] rounded-[4px] p-[8px] ">
              <button className="text-[#797979] text-[16px] font-[400]" onClick={handleSignout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* navigation links */}
        <div className="w-[253px] h-[268px] grid gap-[8px]">
          {/* home */}
          <div className="w-full h-[40px] flex gap-[14px] border-[1px]">
            <div className="flex w-full rounded-[4px] p-[8px] gap-[14px] bg-[#DDDDDD]">
              <Image className="w-[24px] h-[24px]" alt="home" src={home} />
              <p className="h-[24px] text-[20px] font-[400] text-[#797979]">Home</p>
            </div>
          </div>

          {/* boards */}
          <div className="w-full h-[40px] flex gap-[14px] ">
            <div className="flex w-full rounded-[4px] p-[8px] gap-[14px] ">
              <Image className="w-[24px] h-[24px]" alt="home" src={boards} />
              <p className="h-[24px] text-[20px] font-[400] text-[#797979]">Boards</p>
            </div>
          </div>

          {/* settings */}
          <div className="w-full h-[40px] flex gap-[14px] ">
            <div className="flex w-full rounded-[4px] p-[8px] gap-[14px] ">
              <Image className="w-[24px] h-[24px]" alt="home" src={setting} />
              <p className="h-[24px] text-[20px] font-[400] text-[#797979]">Settings</p>
            </div>
          </div>

          {/* teams */}
          <div className="w-full h-[40px] flex gap-[14px] ">
            <div className="flex w-full rounded-[4px] p-[8px] gap-[14px] ">
              <Image className="w-[24px] h-[24px]" alt="home" src={team} />
              <p className="h-[24px] text-[20px] font-[400] text-[#797979]">Teams</p>
            </div>
          </div>

          {/* analytics */}
          <div className="w-full h-[40px] flex gap-[14px] ">
            <div className="flex w-full rounded-[4px] p-[8px] gap-[14px] ">
              <Image className="w-[24px] h-[24px]" alt="home" src={ana} />
              <p className="h-[24px] text-[20px] font-[400] text-[#797979]">Analytics</p>
            </div>
          </div>

          <button
            className="text-[20px] font-[500] h-[52px] flex text-white items-center justify-center gap-[8px] rounded-[8px] border-[1px]"
            style={{ background: "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%)" }}
            onClick={toggleDrawer}
          >
            Create new task
            <Image alt="create new task" src={buttonIcon} />
          </button>
        </div>
      </div>

      {/* sidebar download app button */}
      <div className="w-[253px] h-[61px]  p-[8px] gap-[8px] flex bg-[#DEDEDE] border-[1px]">
        <button>
          <Image src={downloadIcon} alt="download app" />
        </button>
        <div className="w-[189px]  h-[45px]">
          <p className="text-[20px] h-[24px] font-[500] text-[#666666]">Download the app</p>
          <p className="text-[14px] h-[17px] font-[500] text-[#666666]">Get the full experience </p>
        </div>
      </div>
    </div>
  );
}

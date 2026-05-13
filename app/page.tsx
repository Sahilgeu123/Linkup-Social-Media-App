import Image from "next/image";
import Sidebar from "./Components/Sidebar";
import PostFeed from "./Components/PostFeed";
import Widget from "./Components/Widget";
import SignUpPrompt from "./Components/SignUpPrompt";
import CommentModal from "./Components/modals/CommentModal";
import LoginScreen from "./Components/modals/LoginScreen";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex text-[#0F1419] min-h-screen max-w-[1400px] mx-auto max-h-screen ">
          <Sidebar />
          <PostFeed />
          <Widget />
          
        </div>
        <CommentModal/>
        <SignUpPrompt />
        <LoginScreen/>
      </div>
    </>
  );
};

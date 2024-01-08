import React, { useEffect, useState } from "react";
import CreateForm from "../components/Ask&Question/CreateForm";
import { useParams } from "react-router-dom";
import "./page.css";
import Cookies from "js-cookie";
import {
  useUserDetailQuery,
  useUserInfoQuery,
} from "../redux/service/api/userApi";
import UserSelection from "../components/Ask&Question/UserSelection";
import UserInformation from "../components/Ask&Question/UserInformation";
import SectionText from "../components/ui/SectionText";
import Vector from "../svg/Vector.svg";
import UserLoader from "../components/UserLoader";

const default_img =
  "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg";

const AskQuestionPage = () => {
  const { name } = useParams();
  const token = Cookies.get("token");
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: loggedUser, isLoading: loggedUserLoading } =
    useUserDetailQuery(token);
  const { data: unLoggedUser, isLoading: unLoggedUserLoading } =
    useUserInfoQuery(name);

  useEffect(() => {
    if (unLoggedUser) {
      const stringyData = JSON.stringify(unLoggedUser);

      const expirationTimeInMinutes = 45;
      const expirationDate = new Date(
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000
      );

      Cookies.set("user", stringyData, { expires: expirationDate });
    }
  }, [unLoggedUser]);

  useEffect(() => {
    const cookiesPost = parseInt(Cookies.get("post") || 0, 10);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    if (!cookiesPost) {
      Cookies.set("post", 0, { expires: expirationDate });
    }
  }, []);
  if (unLoggedUserLoading) {
    return <UserLoader />;
  }
  return (
    <div className="pt-32 bg-primary">
      <SectionText>
        <div className="flex flex-col justify-center items-center text-secondary w-[95%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto h-full z-[2] select-none">
          <h3 className="text-4xl font-semibold font-curve mb-4 text-center drop-shadow-2xl">
            ✍️ Share Your Thoughts!
          </h3>
          <p className="text-xl font-semibold mb-4 text-center drop-shadow-xl">
            Wondering how your day is unfolding? Need an outlet? We're here to
            hear you out—always by your side.
          </p>
          <p className="text-3xl font-semibold drop-shadow-xl">
            What's on your mind today?
          </p>
        </div>
      </SectionText>

      <div className="bg-slate-950/90 min-h-full">
        <img src={Vector} alt="" className="w-screen select-none" />

        {loggedUserLoading || unLoggedUserLoading ? (
          <div className="h-screen text-5xl text-white flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <div className="py-12 w-[95%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto">
            <UserInformation
              data={loggedUser || unLoggedUser}
              token={token}
              default_img={default_img}
            />
          </div>
        )}
        {token && (
          <UserSelection
            token={token}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            default_img={default_img}
          />
        )}
        <CreateForm
          userInfo={loggedUser}
          selectedUser={selectedUser}
          name={name}
        />
      </div>
    </div>
  );
};

export default AskQuestionPage;

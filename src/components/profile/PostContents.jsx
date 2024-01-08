import React, { useMemo } from "react";
import QuestionCard from "../Ask&Question/QuestionCard";
import RecentCard from "../Ask&Question/RecentCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useUserDetailQuery } from "../../redux/service/api/userApi";

const PostContents = ({ questions, isLoading, home }) => {
  const token = Cookies.get("token");
  const { data } = useUserDetailQuery(token);
  const navigate = useNavigate();

  const topFiveRecentlyContents = questions?.slice(0, 5);

  const anonymous_img =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg";
  const memoQuestion = useMemo(() => {
    return questions?.map((q) => (
      <QuestionCard
        key={q.paysar_id}
        {...q}
        img={anonymous_img}
        token={token}
        home={home}
      />
    ));
  }, [questions]);
  const memoRecently = useMemo(() => {
    return topFiveRecentlyContents?.map((q) => (
      <RecentCard key={q.paysar_id} {...q} img={anonymous_img} token={token} />
    ));
  }, [topFiveRecentlyContents]);
  if (isLoading) {
    return (
      <div className="h-[50vh] text-secondary flex justify-center items-center gap-4 w-[97%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <>
      {questions?.length > 0 ? (
        <div className="min-h-full flex justify-between gap-4 w-[97%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto pt-10 relative text-secondary pb-10">
          <div className="flex w-full md:w-[60%] flex-col gap-6">
            {/* {questions?.map((question) => (
              <QuestionCard
                key={question.paysar_id}
                {...question}
                img={anonymous_img}
                token={token}
              />
            ))} */}
            {memoQuestion}
          </div>
          <div className="w-[40%] relative hidden md:block">
            <div className="flex flex-col sticky top-48">
              <h3 className="text-2xl font-semibold mb-4">Recent Topics</h3>
              <div className="flex flex-col gap-10">
                {/* {topFiveRecentlyContents?.map((question) => (
                  <RecentCard
                    key={question.paysar_id}
                    {...question}
                    img={anonymous_img}
                  />
                ))} */}
                {memoRecently}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] text-secondary flex justify-center items-center gap-4 w-[97%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto flex-col">
          <h3 className="text-4xl mb-3">
            You haven't {home ? "received" : "created"} any{" "}
            <span className="font-curve font-semibold">PaySar</span> yet.
          </h3>
          <p className="text-gray-300 text-2xl mb-3">
            Why don't you make a PaySar and send it to your friend.
          </p>
          {home ? (
            <Button
              text={"No message received yet."}
              onClick={() => navigate(`/user/${data?.username}/ask-question`)}
            />
          ) : (
            <Button
              text={"Ask Question Now"}
              onClick={() => navigate(`/user/${data?.username}/ask-question`)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PostContents;

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/baseUrl";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((state) => state.feed);

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return;
      try {
        const res = await axios.get(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    getFeed();
  }, [dispatch, feed]);

  if (!feed) return null;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    <div className="flex justify-center mt-10 mb-20">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;

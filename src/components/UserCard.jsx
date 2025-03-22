import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const location = useLocation();
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>Age: {age ? age : "NIL"}</p>
        <p>Gender: {gender ? gender : "NIL"}</p>
        <p>{about}</p>
        {location.pathname !== "/profile" && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

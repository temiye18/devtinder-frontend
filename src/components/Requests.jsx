import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/baseUrl";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const [showToast, setShowToast] = useState(false);

  const reviewRequest = async (requestId, status) => {
    console.log(requestId, status);
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      const updatedRequest = requests.filter((req) => req._id !== requestId);
      dispatch(addRequests(updatedRequest));

      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
        clearTimeout(timer);
      }, 3000);
    } catch (err) {
      console.error(err?.response);
      return;
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });

        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error(err?.response);
      }
    };

    fetchRequests();
  }, [dispatch]);

  if (!requests) return null;

  if (requests?.length === 0)
    return <h1 className="flex justify-center my-10">No Request Found.</h1>;
  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Requests</h1>

        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
              key={request._id}
            >
              <div>
                <img
                  className="rounded-full object-cover w-20 h-20"
                  src={photoUrl}
                  alt="user"
                />
              </div>

              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p>
                    {age}, {gender}
                  </p>
                )}
                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Done</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;

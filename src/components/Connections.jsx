import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });

        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(err?.response);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (!connections) return null;

  if (connections?.length === 0)
    return <h1 className="flex justify-center my-10">No Connections Found.</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            className=" flex  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            key={_id}
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
            <Link to={`/chat/${_id}`}>
              <button className="btn btn-primary">Message</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

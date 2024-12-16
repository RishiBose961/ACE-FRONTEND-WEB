/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HeartHandshake } from "lucide-react";
import { useSelector } from "react-redux";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const FollowButton = ({ diffProfile }) => {
  const queryClient = useQueryClient();
  const { base_url } = CheckEnvironment();
  const user = useSelector((state) => state.auth.user);

  const {
    isPending: isLoading,
    error,
    isError,
    data: followbut,
  } = useQuery({
    queryKey: ["followbuts"],
    queryFn: async () => {
      return await fetch(`${base_url}/api/get-following`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => res.json());
    },
    staleTime: 30000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const createFollowers = async () => {
    const response = await fetch(
      `${base_url}/api/create-follow/${diffProfile}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: createFollowers,
    onError: (error) => {
      // Handle error
      console.error("Error creating like:", error);
    },
    onSuccess: (data) => {
      // Handle success
      // console.log("Data added successfully:", data);
      queryClient.invalidateQueries("followbuts");
    },
  });

  const handleFollowUser = () => {
    mutate();
  };

  const createunFollowers = async () => {
    const response = await fetch(
      `${base_url}/api/create-unfollow/${diffProfile}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  };

  const { mutate: mutates } = useMutation({
    mutationFn: createunFollowers,
    onError: (error) => {
      // Handle error
      console.error("Error creating like:", error);
    },
    onSuccess: (data) => {
      // Handle success
      // console.log("Data added successfully:", data);
      queryClient.invalidateQueries("followbuts");
    },
  });

  const handleunFollowUser = () => {
    mutates();
  };

  const folo = Array.isArray(followbut)
    ? followbut?.map((item) => item.id).includes(diffProfile)
    : false;

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <>
      {diffProfile !== user?._id ? (
        <div className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
          {diffProfile !== user._id && (
            <HeartHandshake
              onClick={folo ? handleunFollowUser : handleFollowUser}
              className={`cursor-pointer ${
                folo ? "text-red-500" : "text-amber-500"
              }`}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FollowButton;

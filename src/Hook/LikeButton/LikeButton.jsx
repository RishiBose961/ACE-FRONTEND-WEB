/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { useSelector } from "react-redux";
import LikeCount from "./LikeCount";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const LikeButton = ({ postedId }) => {
  const user = useSelector((state) => state.auth.user);

  const queryClient = useQueryClient();
  const { base_url } = CheckEnvironment();
  const {
    isPending: isLoading,
    error,
    isError,
    data: likepost,
  } = useQuery({
    queryKey: ["likeposts"],

    queryFn: async () => {
      return await fetch(`${base_url}/api/get-like`, {
        method: "GET",
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

  const createLike = async () => {
    const response = await fetch(`${base_url}/api/create-like/${postedId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: createLike,
    onError: (error) => {
      // Handle error
      console.error("Error creating like:", error);
    },
    onSuccess: (data) => {
      // Handle success
      // console.log("Data added successfully:", data);
      queryClient.invalidateQueries("likeposts");
    },
  });

  const handleLikeUser = () => {
    mutate();
  };

  const likeposts = likepost?.map((item) => item?.postId)?.includes(postedId);

  return (
    <div className="flex justify-start space-x-4">
      <div className="rounded-full ">
        <StarIcon
          onClick={handleLikeUser}
          className={` cursor-pointer  ${
            likeposts ? "fill-current text-red-500 " : " hover:text-red-500"
          }`}
        />
      </div>
      <LikeCount postedId={postedId} />
    </div>
  );
};

export default LikeButton;

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
    data: likepost,
    isError,
    error,
  } = useQuery({
    queryKey: ["likeposts"],
    queryFn: async () => {
      const response = await fetch(`${base_url}/api/get-like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch likes");
      return response.json();
    },
    staleTime: 30000,
  });

  const likeposts = likepost?.map((item) => item?.postId)?.includes(postedId);

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${base_url}/api/create-like/${postedId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    onMutate: async () => {
      // Optimistic update for UI
      queryClient.setQueryData(["likeposts"], (oldData) => {
        if (!oldData) return [];
        return likeposts
          ? oldData.filter((item) => item.postId !== postedId) // Remove if already liked
          : [...oldData, { postId: postedId }]; // Add if not already liked
      });
    },
    onError: (error, _, rollback) => {
      console.error("Error creating like:", error);
      // Rollback optimistic update if needed
      if (rollback) rollback();
    },
    onSuccess: () => {
      // Invalidate queries to synchronize the actual database state
      queryClient.invalidateQueries(["likeposts"]);
    },
  });

  const handleLikeUser = () => {
    mutate();
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex justify-start space-x-4">
      <div className="rounded-full">
        <StarIcon
          onClick={handleLikeUser}
          className={`cursor-pointer ${
            likeposts ? "fill-current text-red-500" : "hover:text-red-500"
          }`}
        />
      </div>
      <LikeCount postedId={postedId} />
    </div>
  );
};

export default LikeButton;

/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const LikeCount = ({ postedId }) => {
  const { base_url } = CheckEnvironment();

  const {
    data: fetchLikeCount,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchLikeCounts", postedId],
    queryFn: async () => {
      const response = await fetch(`${base_url}/api/get-count/${postedId}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch like count");
      return response.json();
    },
    staleTime: 30000,
  });

  const likeCount = fetchLikeCount?.count ?? 0;

  if (isLoading)
    return (
      <div>
        <span className="loading loading-ring loading-sm"></span>
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  return <div>{likeCount}</div>;
};

export default LikeCount;

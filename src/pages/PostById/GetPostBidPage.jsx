import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import GetPostUser from "./GetPostUser";
import MainComment from "../CommentPage/MainComment";
import LikeButton from "../../Hook/LikeButton/LikeButton";
import CheckEnvironment from "../../Hook/CheckEnvironment/CheckEnvironment";

const GetPostBidPage = () => {
  const { postid } = useParams();

  const { base_url } = CheckEnvironment();

  const {
    isPending,
    error,
    isError,
    data: fetchPostById,
  } = useQuery({
    queryKey: ["fetchPostByIds", postid],
    queryFn: async () => {
      return await fetch(`${base_url}/api/get-project-byid/${postid}`, {
        method: "GET",
      }).then((res) => res.json());
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <span>Pending</span>;
  }

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className=" col-span-2">
        <div className=" rounded-lg shadow-md overflow-hidden">
          <div>
            <img
              src={fetchPostById?.specificPost?.projectImage}
              alt={"title"}
              className="rounded-2xl  h-96 w-full px-2"
            />
          </div>
          <div className="flex justify-between items-center px-3">
            <GetPostUser userInfoById={fetchPostById?.specificPost?.users} />
            <LikeButton postedId={postid} />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">
              {fetchPostById?.specificPost?.title}
            </h2>
            <p className="text-white mb-4">
              {fetchPostById?.specificPost?.description}
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                category
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(
                  fetchPostById?.specificPost?.createdAt
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-start space-x-4">
              <a
                href={fetchPostById?.specificPost?.plink}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Project
              </a>
              <a
                href={fetchPostById?.specificPost?.prepository}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MainComment />
      </div>
    </div>
  );
};

export default GetPostBidPage;

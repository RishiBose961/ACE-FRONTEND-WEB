/* eslint-disable react/prop-types */
import { Computer, EyeIcon, ProjectorIcon, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router";
import LikeButton from "../../Hook/LikeButton/LikeButton";

const ProjectImage = ({
  item,
  imagePreview,
  title,
  description,
  pcategory,
}) => {
  const link = "https://github.com/";

  const location = useLocation();
  const url = location.pathname.split("/")[1];



  return (
    <>
      <ol className="relative border-s-2  border-cyan-500   m-5">
        <li className="mb-10 ms-6">
          <span
            className="absolute flex items-center justify-center w-6 h-6 
          bg-blue-100 rounded-full -start-3 ring-8  ring-white dark:ring-gray-900 dark:bg-blue-900"
          >
            <Computer className="animate-pulse" />
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 text-pretty dark:text-white">
            {item?.title || title || "Add Project Title"}

            {new Date(item?.createdAt).toDateString() ===
            new Date().toDateString() ? (
              <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 ms-3">
                New
              </span>
            ) : (
              ""
            )}
          </h3>
          <time className="block mb-4 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {new Date(item?.createdAt).toLocaleDateString() ||
              "Time Now Created"}
          </time>

          <img
            src={
              item?.projectImage ||
              imagePreview ||
              "https://plus.unsplash.com/premium_photo-1732730224306-3b469ea9e640?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            }
            alt=""
            className=" w-full h-48 rounded-xl"
          />
        </li>

        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg
              className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>

          <span
            className="bg-blue-100 text-blue-800 text-sm font-medium me-2 
          px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 "
          >
            {item?.pcategory || pcategory || "category"}
          </span>
          {url === "new" ? (
            ""
          ) : (
            <div className="flex justify-between mt-4">
              <LikeButton postedId={item?.id} />
              <Link to={`/read/${item?.id}`}>
                <EyeIcon className=" hover:text-purple-500" />
              </Link>
              <Share2 className=" cursor-pointer hover:text-orange-500" />
              {link.includes("github.com") ? (
                <ProjectorIcon className=" cursor-pointer" />
              ) : null}
            </div>
          )}
          <p className="text-base text-pretty font-normal text-gray-500 dark:text-gray-400 mt-3">
            {item?.description || description || "Add a description"}
          </p>
        </li>
      </ol>
    </>
  );
};

export default ProjectImage;

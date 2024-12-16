/* eslint-disable react/prop-types */
import { Eye, QrCode, Share2 } from "lucide-react";
import { Link } from "react-router";
import LikeButton from "../../Hook/LikeButton/LikeButton";
const AnimateCard = ({
  id,
  userDetails,
  imagePreview,
  isPending,
  title,
  pcategory,
}) => {
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border
     border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={imagePreview}
          alt="loading"
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 text-sm mb-2">
          <div className="capitalize left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
            {pcategory}
          </div>
        </div>
        <h3 className="text-lg font-semibold bg-black/50 w-fit text-white px-2 rounded-3xl mb-4">
          {title}
        </h3>
        <div className="flex items-center justify-between bg-black/50 mb-2 rounded-full">
          <div className="flex items-center gap-4">
            <Link
              to={`/read/${id}`}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Eye className=" text-white" />
            </Link>
            <div className="flex items-center gap-1">
              <LikeButton postedId={id} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <QrCode className=" text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Share2 className=" text-white" />
            </button>

              <Link to={`/${userDetails?.username}`}>
                <div className="avatar">
                  <div className="ring-red-500 ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                    <img src={userDetails?.avatar} alt="loading"/>
                  </div>
                </div>
              </Link>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimateCard;

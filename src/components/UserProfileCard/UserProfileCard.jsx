import { useQuery } from "@tanstack/react-query";
import { SquarePlus } from "lucide-react";
import { Link, useParams } from "react-router"; // Changed to "react-router-dom" for compatibility
import CheckEnvironment from "../../Hook/CheckEnvironment/CheckEnvironment";
import FollowButton from "../../Hook/FollowButton/FollowButton";
import useFetchSkill from "../../Hook/SkillHook/useFetchSkill";
import UserUpdateProfile from "./UserUpdateProfile";

const UserProfileCard = () => {
  const { username } = useParams();

  const { isPending: isSkillLoading, fetchSkill } = useFetchSkill();
  const { base_url } = CheckEnvironment();
  const {
    isPending: isProfileLoading,
    error,
    isError,
    data: profileData,
  } = useQuery({
    queryKey: ["profileDatas", username],
    queryFn: async () => {
      const response = await fetch(`${base_url}/api/profile/${username}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isProfileLoading) {
    return <div className="skeleton h-32"></div>;
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 rounded-3xl to-gray-900 p-6">
      <div className="flex flex-wrap items-start gap-4">
        <div className="relative">
          <img
            src={profileData?.avatar || "default-avatar.png"}
            alt="Profile avatar"
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20 bg-blue-400"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100">
                {profileData?.name || "Unknown User"}
              </h1>
              <p className="text-sm sm:text-base uppercase text-gray-300">
                {isSkillLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  fetchSkill?.[0]?.category || "No category available"
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <FollowButton diffProfile={profileData?._id} />

              <Link
                className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                to="/new"
              >
                <SquarePlus className="cursor-pointer hover:text-cyan-500" />
              </Link>
              <UserUpdateProfile />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {fetchSkill?.[0]?.skills?.length > 0 ? (
              <>
                {fetchSkill[0].skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full capitalize bg-red-600/30 text-red-100 text-sm flex items-center gap-1"
                  >
                    {skill}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-gray-500">No skills available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;

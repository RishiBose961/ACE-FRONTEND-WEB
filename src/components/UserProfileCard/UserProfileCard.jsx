import { useQuery } from "@tanstack/react-query";
import { Edit2Icon } from "lucide-react";
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
    return <p>Loading...</p>;
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
                <Edit2Icon className="cursor-pointer hover:text-cyan-500" />
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

    // <div className="container mx-auto px-4">
    //   <div className="shadow-lg rounded-lg overflow-hidden">
    //     <div className="p-6">
    //       <div className="flex flex-col sm:flex-row items-center gap-4">
    //         <div className="w-24 h-24 relative">
    //           <img
    //             src={profileData?.avatar || "default-avatar.png"} // Fallback for missing avatar
    //             alt={`${profileData?.name}'s profile picture`}
    //             className="rounded-full"
    //           />
    //         </div>
    //         <div className="text-center sm:text-left">
    //           <div className="lg:flex flex-row justify-start items-center space-x-6">
    //             <div>
    //               <h1 className="text-3xl font-bold">
    //                 {profileData?.name || "Unknown User"}
    //               </h1>
    //               <p>
    //                 {isSkillLoading ? (
    //                   <span className="loading loading-dots loading-sm"></span>
    //                 ) : (
    //                   fetchSkill?.[0]?.category || "No category available"
    //                 )}
    //               </p>
    //             </div>
    //             <div className="flex justify-center items-center space-x-4 m-4">
    //               <FollowButton diffProfile={profileData?._id} />
    //               <Link to="/new">
    //                 <Edit2Icon className="cursor-pointer hover:text-cyan-500" />
    //               </Link>
    //               <UserUpdateProfile />
    //             </div>
    //           </div>
    //           <div className="flex flex-wrap gap-2 mt-2">
    //             {fetchSkill?.[0]?.skills?.length > 0 ? (
    //               <div className="flex flex-wrap gap-2 mt-2">
    //                 {fetchSkill[0].skills.map((skill, index) => (
    //                   <span
    //                     key={index}
    //                     className="px-3 py-1 rounded-full capitalize bg-red-600/30 text-red-100 text-sm flex items-center gap-1"
    //                   >
    //                     {skill}
    //                   </span>
    //                 ))}
    //               </div>
    //             ) : (
    //               <span className="text-gray-500">No skills available</span>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserProfileCard;

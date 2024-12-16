import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";


const InformationProfileUrl = () => {
    const location = useLocation();
    const username = location.pathname.split("/")[1];

    const { base_url } = CheckEnvironment();
    const {
        isPending: isProfileLoading,
        error,
        isError,
        data: profileDatas,
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

      return {profileDatas}
}

export default InformationProfileUrl
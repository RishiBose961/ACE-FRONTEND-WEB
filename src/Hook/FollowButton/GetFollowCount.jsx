import { useQuery } from "@tanstack/react-query";
import InformationProfileUrl from "../InformationProfileUrl/InformationProfileUrl";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const GetFollowCount = () => {
    const {profileDatas} = InformationProfileUrl()
    const { base_url } = CheckEnvironment();
    const {
        isPending,
        error,
        isError,
        data: fetchFollowsData,
      } = useQuery({
        queryKey: ["fetchFollowsDatas",profileDatas?._id],
        queryFn: async () => {
          return await fetch(`${base_url}/api/get-following/${profileDatas?._id}`, {
            method: 'GET',
          
          }).then((res) => res.json());
        },
      });
  
  
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }

      return { isPending, fetchFollowsData };

}

export default GetFollowCount
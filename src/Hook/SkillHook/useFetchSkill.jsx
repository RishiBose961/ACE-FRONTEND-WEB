import { useQuery } from "@tanstack/react-query";
import InformationProfileUrl from "../InformationProfileUrl/InformationProfileUrl";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const useFetchSkill = () => {
  const {profileDatas} = InformationProfileUrl()
  const { base_url } = CheckEnvironment();
    
    const {
        isPending,
        error,
        isError,
        data: fetchSkill,
      } = useQuery({
        queryKey: ["fetchSkills",profileDatas?._id],
        queryFn: async () => {
          return await fetch(`${base_url}/api/get-skill/${profileDatas?._id}`, {
            method: 'GET',
          
          }).then((res) => res.json());
        },
      });
  
  
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }


      return { isPending, fetchSkill:fetchSkill?.userInfoSkills };
}

export default useFetchSkill
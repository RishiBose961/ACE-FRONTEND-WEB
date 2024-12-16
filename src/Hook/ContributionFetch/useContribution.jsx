import { useQuery } from "@tanstack/react-query";
import InformationProfileUrl from "../InformationProfileUrl/InformationProfileUrl";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const useContribution = () => {
    const {profileDatas} = InformationProfileUrl()
    const { base_url } = CheckEnvironment();
    const {
        isPending,
        error,
        isError,
        data: fetchContribution,
      } = useQuery({
        queryKey: ["fetchContributions",profileDatas?._id],
        queryFn: async () => {
          return await fetch(`${base_url}/api/get-contribution/${profileDatas?._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json());
        },
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
      

      return { isPending, fetchContribution };
}

export default useContribution
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import InformationProfileUrl from "../InformationProfileUrl/InformationProfileUrl";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const useFetchProjectUser = () => {

  const user = useSelector((state) => state.auth.user);

  const {profileDatas} = InformationProfileUrl()
  const { base_url } = CheckEnvironment();
  
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 2,
  });

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 2;

  const {
    isPending,
    error,
    isError,
    data: fetchProject,
  } = useQuery({
    queryKey: ["fetchProjects",page, limit,profileDatas],
    queryFn: async () => {
      return await fetch(`${base_url}/api/get-project/${profileDatas?._id}?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => res.json());
    },
    placeholderData: keepPreviousData,
  });

    // Update the search params in the URL
    const handlePageChange = (newPage) => {
      setSearchParams({ page: newPage, limit });
    };
  
    // Move to the previous page
    const handlePrevious = () => {
      if (page > 1) {
        handlePageChange(page - 1);
      }
    };
  
    // Move to the next page
    const handleNext = () => {
      if (page < fetchProject?.totalPages) {
        handlePageChange(page + 1);
      }
    };
  
    // Directly jump to the selected page
    const handlePageClick = (pageNumber) => {
      handlePageChange(pageNumber);
    };
  
    if (isError) {
      return <span>Error: {error.message}</span>;
    }

  
    // Generate page numbers dynamically
    const totalPages = fetchProject?.totalPages || 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  

  return { isPending, fetchProject: fetchProject?.posts,page, pageNumbers,handleNext, handlePageClick, handlePrevious};
};

export default useFetchProjectUser;

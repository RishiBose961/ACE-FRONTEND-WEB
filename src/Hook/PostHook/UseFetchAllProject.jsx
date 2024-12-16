import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import CheckEnvironment from "../CheckEnvironment/CheckEnvironment";

const UseFetchAllProject = () => {
  const { base_url } = CheckEnvironment();
    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 3,
      });
    
      const page = parseInt(searchParams.get("page")) || 1;
      const limit = parseInt(searchParams.get("limit")) || 3;
    
      const {
        isPending,
        error,
        isError,
        data: fetchProjectAll,
      } = useQuery({
        queryKey: ["fetchProjectAlls",page, limit],
        queryFn: async () => {
          return await fetch(`${base_url}/api/getall-project?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
          if (page < fetchProjectAll?.totalPages) {
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
        const totalPages = fetchProjectAll?.totalPages || 1;
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
      
    
      return { isPending, fetchProjectAll: fetchProjectAll?.data,page, pageNumbers,handleNext, handlePageClick, handlePrevious};
}

export default UseFetchAllProject
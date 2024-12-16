import React from "react";
import ProjectImage from "../../components/Image/ProjectImage";
import Pagination from "../../components/Pagination/Pagination";
import Stats from "../../components/Stats/Stats";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import useFetchProjectUser from "../../Hook/PostHook/useFetchProjectUser";

const MainPage = () => {
  const {
    isPending,
    fetchProject,
    pageNumbers,
    handleNext,
    handlePageClick,
    handlePrevious,
    page,
  } = useFetchProjectUser();

  

 
  
  return (
    <div className=" space-y-5 mx-2">
      <UserProfileCard />
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <>
          <Stats />
          {isPending
            ? "loading"
            : fetchProject?.map((item, index) => (
                <React.Fragment key={index}>
                  <ProjectImage item={item} />
                </React.Fragment>
              ))}
        </>
      </div>
      <div className="flex justify-center pb-4">
        <Pagination
          handlePrevious={handlePrevious}
          page={handlePrevious}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          pageNumbers={pageNumbers}
          pages={page}
        />
      </div>
    </div>
  );
};

export default MainPage;

import { SquarePlus } from "lucide-react";
import React from "react";
import { Link } from "react-router";
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
          {isPending ? (
            "loading"
          ) : (
            <>
              {fetchProject?.length > 0 ? (
                fetchProject.map((item, index) => (
                  <React.Fragment key={index}>
                    <ProjectImage item={item} />
                  </React.Fragment>
                ))
              ) : (
                <p className=" text-center items-center flex justify-center font-bold mt-4">
                  Go ahead and upload your first project.
                  <Link to="/new" className=" mx-3">
                    <SquarePlus className=" animate-pulse" />
                  </Link>
                </p>
              )}
            </>
          )}
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

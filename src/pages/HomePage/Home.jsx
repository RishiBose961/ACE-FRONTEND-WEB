import AnimateCard from "../../components/Card/AnimateCard";
import Pagination from "../../components/Pagination/Pagination";
import UseFetchAllProject from "../../Hook/PostHook/UseFetchAllProject";
import ProfileDowload from "../ProfilePage/ProfileDowload";
const Home = () => {
  // Reference to the card

  const {
    isPending,
    fetchProjectAll,
    page,
    pageNumbers,
    handleNext,
    handlePageClick,
    handlePrevious,
  } = UseFetchAllProject();




  return (
    <>
      <ProfileDowload />
      <main className=" py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10">
            Ace the other project
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {fetchProjectAll?.map((card, index) => (
              <AnimateCard
              isPending={isPending}
                key={index}
                id={card.id}
                imagePreview={card.projectImage}
                userDetails={card?.users}
                title={card.title}
                pcategory={card.pcategory}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center pb-4 mt-2">
          <Pagination
            handlePrevious={handlePrevious}
            page={handlePrevious}
            handleNext={handleNext}
            handlePageClick={handlePageClick}
            pageNumbers={pageNumbers}
            pages={page}
          />
        </div>
      </main>
    </>
  );
};

export default Home;

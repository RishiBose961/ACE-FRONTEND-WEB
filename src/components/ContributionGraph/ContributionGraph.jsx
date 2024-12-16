import { useState, useEffect } from 'react';
import useContribution from '../../Hook/ContributionFetch/useContribution';

const ContributionGraph = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [monthsData, setMonthsData] = useState([]); 

  const { isPending, fetchContribution } = useContribution(); 

  // Define color styling based on the count of contributions
  const getColor = (count) => {
    if (count < 3) return 'bg-rose-200';
    if (count < 6) return 'bg-rose-400';
    return 'bg-rose-600';
  };

  // Group data by month
  const groupByMonth = (data) => {
    const months = {};
    data?.forEach((day) => {
      const [year, month] = day.date.split('-');
      const monthKey = `${year}-${month}`;
      if (!months[monthKey]) months[monthKey] = [];
      months[monthKey].push(day);
    });
    return Object.entries(months);
  };

  // Fetch contributions and group them by month on component mount
  useEffect(() => {
    const fetchData = async () => {
      const contributions = await fetchContribution;
      if (contributions && Array.isArray(contributions)) {
        const groupedData = groupByMonth(contributions);
        setMonthsData(groupedData);

        // Set the default page to the current month if available
        const currentMonthKey = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
        const defaultPageIndex = groupedData.findIndex(([month]) => month === currentMonthKey);

        // Set to current month if found, otherwise the latest month
        setCurrentPage(defaultPageIndex !== -1 ? defaultPageIndex : groupedData.length - 1);
      }
    };
    fetchData();
  }, [fetchContribution]);

  const totalPages = monthsData.length;

  // Pagination controls
  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  // Get current month's data
  const [currentMonth, days] = monthsData[currentPage] || [null, []];

  return (
    <div className="w-full max-w-5xl bg-black/50 rounded-lg shadow-md p-6 relative mx-auto">
      <p className="mb-4 text-center text-white">Month-wise ACE activity</p>

      {isPending ? <p className="text-center text-gray-400">Loading...</p>:
      <>
      
      {currentMonth && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-center text-white">
            {new Date(`${currentMonth}-01`).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div
                key={day.date}
                className={`w-4 h-4 rounded-sm border border-gray-200 ${getColor(day.count)}`}
                title={day.count > 0 ? `Contributions: ${day.count}` : 'No Contributions'}
              >
              </div>
            ))}
          </div>
        </div>
      )}

      </>
      
      }

    
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 rounded text-black bg-cyan-200 ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-300'
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded text-black bg-cyan-200 ${
            currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-300'
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContributionGraph;

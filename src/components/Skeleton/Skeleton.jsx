export default function Skeleton() {
    return (
     <>
        {/* Grid of Video Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[0,1,2].map((_, i) => (
            <div key={i} className="space-y-3">
              {/* Video Thumbnail */}
              <div className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
              
              {/* Video Info */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
     </>
//         {/* Header Skeleton */}
//         {/* <div className="flex items-center gap-4 mb-8">
//           <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
//           <div className="space-y-2">
//             <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
//             <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
//           </div>
//         </div>
//    */}
     
  
      
  
    )
  }
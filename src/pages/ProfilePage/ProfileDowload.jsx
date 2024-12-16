import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProfileDowload = () => {
  const { user } = useSelector((state) => state.auth);
  const cardRef = useRef();
  const handleDownload = () => {
    if (cardRef.current) {
      // Convert the card to a PNG image
      toPng(cardRef.current, { quality: 1 })
        .then((dataUrl) => {
          // Create a link to trigger the download
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${user?.name}_profile.png`; // File name
          link.click();
        })
        .catch((err) => {
          console.error("Failed to generate image", err);
        });
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white/20 bg-white/10 backdrop-blur-xl">
            <img
              src={user?.avatar}
              alt="Profile"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
            <p className="text-blue-200 mb-1">{user?.username}</p>
            <p className="text-gray-300 mb-4">{user?.email}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to={`/${user?.username}`}
                className="px-6 py-2.5 rounded-full bg-blue-500
                 hover:bg-blue-600 transition-colors text-white font-medium"
              >
                View Profile
              </Link>
              <button
                onClick={handleDownload}
                className="p-2.5 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDowload;

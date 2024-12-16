/* eslint-disable react/prop-types */

const GetPostUser = ({userInfoById}) => {
  return (
    <div className="flex items-center gap-4 p-4 mt-4  text-white">
        <div className="relative w-12 h-12">
          <img
            src={userInfoById?.avatar}
            alt="avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="font-medium">{userInfoById?.username}</span>
            {/* <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current text-gray-400"
              aria-label="Verified"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
            </svg> */}
          </div>
          <span className="text-sm text-gray-400">108K</span>
          <div className="flex items-center gap-2 ml-auto">
            <button className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>
  )
}

export default GetPostUser
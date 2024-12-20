/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router";

const MenuHeader = ({ user }) => {
  return (
    <Menu>
      <MenuButton>
        {/* <Link to={`/${user?.username}`}> */}
        <div className="avatar">
          <div className="ring-cyan-500 ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img src={user?.avatar} />
          </div>
        </div>
        {/* </Link> */}
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="w-52 mt-1 origin-top-right z-20 rounded-xl border border-white/5 bg-black
     p-2 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] 
     focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <Link to={`/${user?.username}`}className="block data-[focus]:bg-gray-500 text-center p-2 rounded-full">
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/add-account' className="block data-[focus]:bg-gray-500 text-center p-2 rounded-full" href="/settings">
           Add Account
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default MenuHeader;

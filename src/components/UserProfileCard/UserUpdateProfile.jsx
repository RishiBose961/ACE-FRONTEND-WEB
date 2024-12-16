/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logoutUserAction } from "../../slice/authSlice";
import UserSkillUpdate from "./UserSkillUpdate";

export default function UserUpdateProfile() {
  let [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState();
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const loginMutation = useMutation({
    mutationFn: async ({ name }) => {
      try {
        const response = await axios.put(
          "/api/update",
          { name }, // Request payload
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error in mutationFn:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      alert("Updated successful!");

      dispatch(logoutUserAction());

      close();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name) {
      setError("Please fill in all fields");
      return;
    }

    // Trigger the mutation
    loginMutation.mutate({ name });
  };

  return (
    <>
    <div className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
    <UserCircle2
        onClick={open}
        className="cursor-pointer  hover:text-purple-500"
      />

    </div>
     
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Profile Update
              </DialogTitle>
              <div className="space-y-2">
                <label className="block text-gray-200">Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                    onClick={handleSubmit}
                  >
                    <Check size={24} />
                  </button>
                </div>
               
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <UserSkillUpdate close={close}/>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

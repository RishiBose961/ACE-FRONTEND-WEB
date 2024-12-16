/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import InputField from "../TextField/InputField";
import { Plus, Save } from "lucide-react";
import useFetchSkill from "../../Hook/SkillHook/useFetchSkill";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserSkillUpdate = ({close}) => {
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const queryClient = useQueryClient();

  const { fetchSkill } = useFetchSkill();


  const user = useSelector((state) => state.auth.user);

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };


  const createMutation = useMutation({
    mutationFn: async ({ category, skills }) => {
      try {
        const response = await axios.post(
          "/api/create-skill",
          {
            category,
            skills,
          },
          {
            headers: {
              "Content-Type": "application/json",
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
      alert("Created successful!");
      queryClient.invalidateQueries("profileDatas");

      close();
    },
    onError: (error) => {
      console.log(error.message);
      
    },
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !skills) {
      return alert("Please select a category and skills")
    }
  

    createMutation.mutate({ category, skills });
  };

  const updateMutation = useMutation({
    mutationFn: async ({ category, skills }) => {
      try {
        const response = await axios.put(
          `/api/update-skill/${fetchSkill[0]?.id}`,
          {
            category,
            skills,
          },
          {
            headers: {
              "Content-Type": "application/json",
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
      queryClient.invalidateQueries("profileDatas");

      close();
    },
    onError: (error) => {
      console.log(error.message);
      
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Trigger the mutation
    if (!category || !skills) {
      return alert("Please select a category and skills")
    }
  
    updateMutation.mutate({ category, skills });
  };


  return (
    <div>
      <form onSubmit={fetchSkill[0]?.id ? handleUpdate : handleSubmit}>
        <div></div>
        <div>
          <InputField
            nameTitle={"Category"}
            placeHolder={"Enter Your Category"}
            type={"text"}
            value={category}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={fetchSkill[0]?.category}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-200">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Your Skills"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              // onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-purple-600/30 text-purple-100 text-sm flex items-center gap-1"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="hover:text-red-300 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {fetchSkill[0]?.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default UserSkillUpdate;

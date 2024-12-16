import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import ProjectImage from "../../components/Image/ProjectImage";
import InputField from "../../components/TextField/InputField";
import TextArea from "../../components/TextField/TextArea";

const Project = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [pcategory, setcategory] = useState("");
  const [plink, setlink] = useState("");
  const [prepository, setprepository] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const createPostMutation = useMutation({
    mutationFn: async ({
      projectImage,
      title,
      description,
      pcategory,
      plink,
      prepository,
    }) => {
      const response = await axios.post(
        "/api/create-project",
        {
          projectImage,
          title,
          description,
          pcategory,
          plink,
          prepository,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      return response.data; // Return response data
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      alert("Post created successfully!");
      setUploadProgress(0);
    },
    onError: (error) => {
      setError(error.message || "An error occurred");
      setUploadProgress(0);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!title || !description || !pcategory || !plink || !prepository) {
      setError("All fields are required.");
      return;
    }

    if (!projectImage) {
      setError("Please upload an image.");
      return;
    }

    // Trigger the mutation
    createPostMutation.mutate({
      projectImage,
      title,
      description,
      pcategory,
      plink,
      prepository,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProjectImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProjectImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };
  const wordLimits = 10;
  const wordLimit = 50;

  const handleTitleChange = (e) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim().split(/\s+/).length;

    if (wordCount <= wordLimits || inputText.trim() === "") {
      settitle(inputText);
    }
  };

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    const wordCount = inputText.trim().split(/\s+/).length;

    if (wordCount <= wordLimit || inputText.trim() === "") {
      setdescription(inputText);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className=" col-span-2">
          <form onSubmit={handleSubmit}>
            <div className=" grid-cols-2 space-y-3">
              <InputField
                nameTitle="Project Title"
                placeHolder="Enter Project Title"
                value={title}
                onChange={handleTitleChange}
              />
              <p style={{ fontSize: "12px", color: "#666" }}>
                {title.trim().split(/\s+/).length}/{wordLimits} words
              </p>
              <div className=" grid grid-cols-2 gap-2">
                <InputField
                  nameTitle="Project Category"
                  placeHolder="Enter Project Category"
                  value={pcategory}
                  onChange={(e) => setcategory(e.target.value)}
                />
                <InputField
                  nameTitle="Image Upload"
                  type="file"
                  className="file-input "
                  placeHolder="Enter Project Category"
                  onChange={handleImageChange}
                />
              </div>

              <InputField
                nameTitle="Project Link"
                placeHolder="Enter Project Link"
                value={plink}
                onChange={(e) => setlink(e.target.value)}
              />
              <InputField
                nameTitle="Project Repository (Optional)"
                placeHolder="Enter Project Repository"
                value={prepository}
                onChange={(e) => setprepository(e.target.value)}
              />
              <TextArea
                nameTitle="Project Describe"
                placeHolder="Enter Project Describe"
                value={description}
                onChange={handleDescriptionChange}
              />
              <p style={{ fontSize: "12px", color: "#666" }}>
                {description.trim().split(/\s+/).length}/{wordLimit} words
              </p>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button nameTitle={"Submit"} type="submit" />

              {uploadProgress > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <p>Uploading: {uploadProgress}%</p>
                  <progress value={uploadProgress} max="100"></progress>
                </div>
              )}
            </div>
          </form>
        </div>

        <ProjectImage
          imagePreview={imagePreview}
          title={title}
          description={description}
          pcategory={pcategory}
        />
      </div>
    </>
  );
};

export default Project;

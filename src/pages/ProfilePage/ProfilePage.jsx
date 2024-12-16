import { Link } from "react-router";
import Button from "../../components/Button/Button";
import InputField from "../../components/TextField/InputField";
import TextArea from "../../components/TextField/TextArea";

const ProfilePage = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="flex justify-center items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-64 rounded-lg ring ring-offset-2">
            <img src="https://images.unsplash.com/photo-1731796603747-409787efd360?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
      </div>
      <div className=" col-span-2">
        <div className=" grid grid-cols-1 gap-3 px-3">
          <InputField nameTitle="FullName" placeHolder="Full Name" />
          <TextArea
            nameTitle="describe yourself"
            placeHolder="Describe Yourself"
          />
          <div className="space-x-3">
          <Button nameTitle="Submit"/>
          <Link className="btn w-20 rounded-full btn-outline btn-accent" to='/new'>NEW</Link>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

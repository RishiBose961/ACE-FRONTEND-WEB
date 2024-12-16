import { Outlet } from "react-router";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;

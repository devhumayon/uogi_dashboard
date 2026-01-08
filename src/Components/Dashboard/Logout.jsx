import { Button } from "antd";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className="h-screen">
      <Link to="/signin">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
};
export default Logout;

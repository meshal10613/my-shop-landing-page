import PrivateRoute from "../components/PrivetRoute";
import Dashboard from "./Dashboard";

const Page = () => {
    return (
        <PrivateRoute>
            <Dashboard />
        </PrivateRoute>
    );
};

export default Page;


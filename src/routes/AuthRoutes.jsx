import Vendor from "@/views/Vendor";
import Organization from "@/views/Organization";


const AuthRoutes = {
  path: "/",
  children: [
    {
      path: "vendor",
      element: <Vendor />,
    },
    {
      path: "organization",
      element: <Organization />,
    },
  ],
};

export default AuthRoutes;
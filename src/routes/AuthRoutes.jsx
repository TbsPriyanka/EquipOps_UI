import Vendor from "@/views/Vendor";


const AuthRoutes = {
  path: "/",
  children: [
    {
      path: "vendor",
      element: <Vendor />,
    },
  ],
};
export default AuthRoutes;

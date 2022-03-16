import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "remix";

const IndexPage: React.FC = () => {
  return <Link to="/app">Go to App</Link>;
};

export default IndexPage;

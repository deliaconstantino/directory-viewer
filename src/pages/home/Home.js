import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link className="underline" to="/teleport">
        Teleport
      </Link>
    </div>
  );
}

export default Home;

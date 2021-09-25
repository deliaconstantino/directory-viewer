import { Link } from "react-router-dom";

function BreadCrumbs({ pathParts }) {
  let currentLinkPath = "";

  return (
    <div className="flex flex-wrap ml-2" data-testid="breadcrumbs">
      {pathParts.map((part, idx) => {
        currentLinkPath += `/${part}`;

        return (
          <Link key={idx} to={currentLinkPath}>
            /<span className="px-1 text-blue-500 underline">{part}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default BreadCrumbs;

import { Link } from "react-router-dom";

function BreadCrumbs({ pathParts }) {
  const linkParts = [];

  let currentLinkPath = "";
  for (let i = 0; i < pathParts.length; i++) {
    currentLinkPath += `/${pathParts[i]}`;
    const currLink = (
      <Link to={currentLinkPath}>
        /<span className="px-1 text-blue-500 underline">{pathParts[i]}</span>
      </Link>
    );
    linkParts.push(currLink);
  }

  return (
    <div className="flex flex-wrap ml-2" data-testid="breadcrumbs">
      {linkParts.map((link, idx) => (
        <span key={idx}>{link}</span>
      ))}
    </div>
  );
}

export default BreadCrumbs;

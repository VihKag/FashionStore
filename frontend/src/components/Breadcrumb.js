import { Link } from 'react-router-dom';

const Breadcrumb = ({ pathSegments }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-2">
          {pathSegments.map((segment, index) => (
            <li key={index} className={`font-medium ${index === pathSegments.length - 1 ? 'text-primary' : ''}`}>
              {index === pathSegments.length - 1 ? (
                segment.name
              ) : (
                <Link to={segment.path}>
                  {segment.name} /
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

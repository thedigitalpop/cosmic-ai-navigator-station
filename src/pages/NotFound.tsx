
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

// List of paths that should redirect to the homepage
const redirectPaths = [
  "/ai-agent-consulting",
  "/articles",
  "/artificial-intelligence-services",
  "/business-ai-coaching",
  "/enterprise-ai-implementation",
  "/full-service-digital-marketing",
  "/other-digital-services",
  "/personal-ai-coaching",
  "/portfolio",
  "/services",
  "/wordpress-consulting",
  "/wordpress-development",
  "/wordpress-hosting-maintenance",
  "/wordpress-services",
];

const NotFound = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Only log error if it's not a redirect path
    if (!redirectPaths.includes(currentPath)) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        currentPath
      );
    }
  }, [currentPath]);

  // Check if the current path is in our redirect list
  if (redirectPaths.includes(currentPath)) {
    console.log(`Redirecting from ${currentPath} to homepage`);
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

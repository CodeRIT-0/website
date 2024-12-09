const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 
function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Technical Difficulties
      </h1>
      <p className="text-gray-700">We apologize, but an error occurred.</p>
      <p className="text-gray-700">Please try again later.</p>
    </div>
  );
}

export default Error;

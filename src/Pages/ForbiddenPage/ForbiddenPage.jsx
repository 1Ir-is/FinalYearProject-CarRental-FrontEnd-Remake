const ForbiddenPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-6xl font-bold">403</h1>
      <p className="text-xl uppercase mb-8">Access not granted</p>
      <svg className="keyhole">
        <use href="#keyhole" />
      </svg>
    </div>
  );
};

export default ForbiddenPage;

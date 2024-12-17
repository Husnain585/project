import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="container text-center">
        <div
          className="min-h-[calc(100vh)]  bg-cover mb-3 bg-fixed relative flex justify-center items-center flex-col"
         
        >
          <h1 className="text-gray-800 text-4xl md:text-6xl capitalize mb-4">
            Welcome to <strong className="text-pink-500">Explore</strong>
          </h1>
          <Link
            to="/product"
            className="text-gray-800 font-bold border-2 rounded-md  px-4 py-2 uppercase hover:bg-gray-400 hover:text-fuchsia-950 my-2 inline-block "
          >
            Product Section
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

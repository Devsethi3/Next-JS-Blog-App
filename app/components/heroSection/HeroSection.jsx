import Image from "next/image";

const Featured = () => {
  return (
    <div className="my-[2rem] featured">
      <h1 className="text-7xl home-text">
        <strong>Hey, Dev Sethi Here!</strong> Discover my stories, thoughts and
        creative ideas
      </h1>
      <div className="grid feature-grid grid-cols-2 items-center gap-6 mt-[3rem]">
        <div className="img-container relative h-[450px]">
          <Image src="/images/culture.png" className="image rounded-md" fill />
        </div>
        <div className="content">
          <h1 className="text-5xl title mb-8 font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h1>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            vitae tenetur quis tempore sunt voluptatem! Provident voluptas quam
            minima nobis totam molestiae soluta dolores? Deserunt dicta
            cupiditate fugiat nesciunt nisi? Autem illum eius dolore mollitia,
            quisquam excepturi quo iste nesciunt.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
            corrupti facere tenetur, iste optio voluptatum aliquid recusandae.
            Dolores neque, aperiam fugit ratione quit.
          </p>
          <button className="mt-[3rem] px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

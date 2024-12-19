import React, { useState } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import bgImg from "../img/harper-sunday-tBKYocAkzRU-unsplash.jpg"

const WhyChooseUs = () => {
  const slides = [
    {
      title: "Let's find luxury together",
      subtitle: "Optio reiciendis accusantium iusto architecto at quia minima maiores quidem, dolorum.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ipsam perferendis asperiores explicabo vel tempore velit totam, natus nesciunt accusantium dicta quod quibusdam ipsum maiores nobis non, eum. Ullam reiciendis dignissimos laborum aut, magni voluptatem velit doloribus quas sapiente optio.",
    },
    {
      title: "Suitable for your every Need",
      subtitle: "Amet cumque nam sed voluptas doloribus iusto. Dolorem eos aliquam quis.",
      content:
        "Dolorem quia fuga consectetur voluptatem. Earum consequatur nulla maxime necessitatibus cum accusamus. Voluptatem dolorem ut numquam dolorum delectus autem veritatis facilis. Et ea ut repellat ea. Facere est dolores fugiat dolor.",
    },
    {
      title: "Aliquid non alias minus",
      subtitle: "Necessitatibus voluptatibus explicabo dolores a vitae voluptatum.",
      content:
        "Neque voluptates aut. Soluta aut perspiciatis porro deserunt. Voluptate ut itaque velit. Aut consectetur voluptatem aspernatur sequi sit laborum. Voluptas enim dolorum fugiat aut.",
    },
    {
      title: "Necessitatibus suscipit non voluptatem quibusdam",
      subtitle: "Tempora quos est ut quia adipisci ut voluptas. Deleniti laborum soluta nihil est.",
      content:
        "Ut rerum et autem vel. Et rerum molestiae aut sit vel incidunt sit at voluptatem. Saepe dolorem et sed voluptate impedit. Ad et qui sint at qui animi animi rerum.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section id="why-us" className="why-us py-16 ">
      <div className="container mx-auto px-4" data-aos="fade-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-500">Why Choose Us</h2>
        </div>

        <div className="flex flex-wrap items-center bg-gray-200" data-aos="fade-up" data-aos-delay="200">
          <div
            className="w-full xl:w-5/12 rounded-md h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImg})` }}
          ></div>

          <div className="w-full xl:w-4/12 relative left-32 flex flex-col justify-center">
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">{slides[currentIndex].title}</h3>
              <h4 className="text-lg font-serif mb-3 text-gray-700 ">{slides[currentIndex].subtitle}</h4>
              <p className='text-gray-900'>{slides[currentIndex].content}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevSlide}
                className="bg-gray-300 text-black px-4 py-2 ml-5 rounded hover:text-green-500"
              >
                <FaArrowLeftLong/>
              </button>
              <button
                onClick={nextSlide}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:text-green-500"
              >
                <FaArrowRightLong/>
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full ${
                    index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

import React from "react";
import Mine from "../../Images/mine.jpg";
import Customer from "../../Images/customer2.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Husnain Raza",
      role: "Developer",
      company: "E-Store Pvt Ltd.",
      message:
        "E-Shop is amazing! The products are top-notch, and the customer service is outstanding. Highly recommended.",
      image: Mine, 
    },
    {
      name: "Shahzaib",
      role: "Customer",
      company: "E-Shop",
      message:
        "The best shopping experience I’ve ever had. Great quality and fast delivery!",
      image: Customer, 
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl mb-12 font-semibold text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">Testimonials</h2>
        <div className="flex justify-center space-x-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-2xl rounded-lg p-6 w-full md:w-5/12"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover object-center"
              />
              <h3 className="text-lg font-bold text-blue-500">{testimonial.name}</h3>
              <p className="text-sm text-blue-500 mb-4">{testimonial.role}</p>
              <p className="text-blue-500 italic">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

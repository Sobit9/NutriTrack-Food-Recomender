import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h1 className="opacity-0 text-gray-600 max-w-[500px] text-lg sm:text-xl md:text-2xl my-6 animate-pop-in sm:text-center sm:max-w-[80%]">
        Have Question In Mind?
      </h1>
      <h1 className="opacity-0 text-gray-600 max-w-[500px] text-lg sm:text-xl md:text-2xl my-6 animate-pop-in sm:text-center sm:max-w-[80%]">
        Let Us Help You
      </h1>
      <div className="contact-form-container sm:py-2 sm:flex-col sm:justify-center sm:items-center sm:rounded-lg">
        <input
          className="sm:text-base sm:max-w-full sm:py-2 sm:mb-3 sm:text-center"
          type="text"
          placeholder="yourmail@gmail.com"
        />
        <button className="sm:text-base sm:py-3 sm:px-8 opacity-0 py-4 px-10 bg-[#fe9e0d] outline-none border-none rounded-full text-lg font-semibold text-white transition duration-200 flex items-center justify-center hover:bg-[#e2ae5f] animate-pop-in">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;

import Link from "next/link";
import React from "react";

const InvestorCard = ({ post }: { post: any }) => {
  const { _id, name, category, companyowned, companyinvested, bio, image } =
    post;

  console.log(post);
  return (
    
    <div>
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        {image ? (
          <div className="flex justify-center mt-2">
            <img
            className="rounded-lg w-50 h-40  object-cover lg:rounded-full"
            src={image}
            alt={name}
          />
          </div>
          
        ) : (
          <div className="rounded-t-lg w-full h-48 bg-gray-200 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-black dark:text-white">
            {name}
          </h5>
        </a>
        <p className="mb-3 text-gray-700 dark:text-gray-400 text-lg font-bold">
          Category: {category}
        </p>
        <p className="mb-3 text-gray-700  dark:text-gray-400 text-sm lg:text-lg font-bold">
          Company Owned: {companyowned}
        </p>
        <Link
          href={`/investors/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
    </div>

    
  );
};

export default InvestorCard;

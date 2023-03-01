import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ProductType } from 'interface/product';
import { Button } from 'ui/button/styled';

export const ProductFeatured = ({
  title,
  picture,
  price,
  id,
  category,
  className,
  recomended,
}: ProductType) => {
  return (
    <div
      className={`card-result rounded-lg mx-4 my-4 shadow-2xl ${
        recomended ? 'w-60 ' : 'w-80'
      }`}
    >
      <Link
        className={`block relative ${
          recomended ? 'h-24' : 'h-48'
        } rounded-t-lg overflow-hidden`}
        href={'/item/' + id}
      >
        <Image
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={picture}
          width={500}
          height={500}
        />
      </Link>
      <div className={` bg-white rounded-b-lg ${recomended && 'py-0'}`}>
        <span className="text-dark text-xs px-2 tracking-widest title-font mb-1">
          {category}
        </span>
        <h2 className="text-gray-900 title-font px-2 text-lg font-medium">
          {title}
        </h2>
        <p className="mt-1 flex justify-between items-center">
          <span className="font-bold text-xl w-1/2 h-full flex justify-center items-center border-2 border-primaryA rounded-bl-lg bg-primaryA/20 text-black">
            ${price}
          </span>
          <Link
            href={'/item/' + id}
            className="flex w-1/2 h-full bg-primaryA text-white items-center justify-center font-bold rounded-br-lg"
          >
            View More
          </Link>
        </p>
      </div>
    </div>
  );
};

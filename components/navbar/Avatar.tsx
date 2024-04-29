"use client";

import Image from "next/image";

const Avatar = ({ src }: { src: string | null | undefined }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.webp"}
    />
  );
};

export default Avatar;

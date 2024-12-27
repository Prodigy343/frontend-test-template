import Image from "next/image";
import Link from "next/link";

export const MainFooter = () => {
  return (
    <footer className="bg-dark-gray flex">
      <Link href="/" className="flex m-auto py-16">
        <Image
          src="/images/apply-logo.svg"
          alt="Apply Digital"
          width={170}
          height={47.09}
          className="w-[170px] h-[47.09px]"
        />
      </Link>
    </footer>
  );
};
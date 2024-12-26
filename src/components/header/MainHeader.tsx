import Link from "next/link";
import Image from "next/image";

export const MainHeader = () => {
  return (
    <header className="bg-light-beige">
      <div className="flex items-center justify-between py-6 full-width-container">
        <Link href="/" className="text-dark-gray font-archivo text-xl font-normal leading-[24px] tracking-[0.4px] no-underline">
          GamerShop
        </Link>
        <nav>
          <ul className="flex justify-end p-0 m-0">
            <li className="flex">
              <Link href="/cart">
                <Image
                  src="/images/cart.svg"
                  alt="cart logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
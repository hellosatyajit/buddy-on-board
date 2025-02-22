"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "./context/auth";
import { signOut } from "@/actions/auth";

const NAVBAR_ITEMS = [
  {
    label: "Become a buddy",
    href: "#",
  },
  {
    label: "How it works",
    href: "#",
  },
  {
    label: "About us",
    href: "#",
  },
];

const USER_MENU_ITEMS = [
  {
    label: "Profile",
    href: "/profile",
    icon: () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.431 13.2502C13.4791 11.6046 12.0122 10.4246 10.3003 9.86524C11.1471 9.36115 11.805 8.59303 12.173 7.67886C12.5409 6.76468 12.5987 5.75499 12.3372 4.80483C12.0758 3.85468 11.5098 3.01661 10.7259 2.41931C9.94213 1.82202 8.98392 1.49854 7.99846 1.49854C7.013 1.49854 6.05479 1.82202 5.27098 2.41931C4.48716 3.01661 3.92108 3.85468 3.65967 4.80483C3.39826 5.75499 3.45598 6.76468 3.82395 7.67886C4.19193 8.59303 4.84982 9.36115 5.69659 9.86524C3.98471 10.424 2.51784 11.604 1.56596 13.2502C1.53105 13.3072 1.5079 13.3705 1.49787 13.4365C1.48783 13.5025 1.49112 13.5699 1.50754 13.6346C1.52396 13.6993 1.55317 13.7601 1.59346 13.8133C1.63374 13.8666 1.68428 13.9112 1.7421 13.9446C1.79992 13.978 1.86384 13.9995 1.93009 14.0078C1.99634 14.0161 2.06358 14.011 2.12785 13.9929C2.19211 13.9748 2.2521 13.944 2.30427 13.9023C2.35643 13.8606 2.39972 13.8089 2.43159 13.7502C3.60909 11.7152 5.69034 10.5002 7.99846 10.5002C10.3066 10.5002 12.3878 11.7152 13.5653 13.7502C13.5972 13.8089 13.6405 13.8606 13.6927 13.9023C13.7448 13.944 13.8048 13.9748 13.8691 13.9929C13.9333 14.011 14.0006 14.0161 14.0668 14.0078C14.1331 13.9995 14.197 13.978 14.2548 13.9446C14.3126 13.9112 14.3632 13.8666 14.4035 13.8133C14.4438 13.7601 14.473 13.6993 14.4894 13.6346C14.5058 13.5699 14.5091 13.5025 14.4991 13.4365C14.489 13.3705 14.4659 13.3072 14.431 13.2502ZM4.49846 6.00024C4.49846 5.308 4.70373 4.63131 5.08832 4.05574C5.4729 3.48017 6.01953 3.03156 6.65907 2.76666C7.29861 2.50175 8.00234 2.43244 8.68128 2.56749C9.36021 2.70254 9.98385 3.03588 10.4733 3.52536C10.9628 4.01485 11.2962 4.63849 11.4312 5.31742C11.5663 5.99635 11.4969 6.70009 11.232 7.33963C10.9671 7.97917 10.5185 8.52579 9.94296 8.91038C9.36738 9.29496 8.6907 9.50024 7.99846 9.50024C7.07051 9.49924 6.18085 9.13018 5.52468 8.47401C4.86852 7.81785 4.49945 6.92819 4.49846 6.00024Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0832 7.49996C16.0832 5.82997 15.4215 4.22826 14.2432 3.04993C13.0648 1.8716 11.4631 1.20996 9.79317 1.20996C8.12318 1.20996 6.52147 1.8716 5.34314 3.04993C4.16481 4.22826 3.50317 5.82997 3.50317 7.49996C3.50317 13.3333 1.2915 15 1.2915 15H18.2915C18.2915 15 16.0832 13.3333 16.0832 7.49996Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6582 18C11.4436 18.3031 11.1605 18.5547 10.8317 18.7295C10.5028 18.9044 10.1381 18.9965 9.76817 18.9965C9.39821 18.9965 9.03359 18.9044 8.70469 18.7295C8.37579 18.5547 8.09271 18.3031 7.87817 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Your bookings",
    href: "/bookings",
    icon: () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6668 3.33337H3.3335C2.41302 3.33337 1.66683 4.07957 1.66683 5.00004V16.6667C1.66683 17.5872 2.41302 18.3334 3.3335 18.3334H16.6668C17.5873 18.3334 18.3335 17.5872 18.3335 16.6667V5.00004C18.3335 4.07957 17.5873 3.33337 16.6668 3.33337Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.66683 8.33337H18.3335"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.8335 1.66663V4.99996"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1665 1.66663V4.99996"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Messages",
    href: "/chat",
    icon: () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 9.58333C17.5029 10.6832 17.2459 11.7682 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6077C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6695 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7682 3.33047 10.6832 3.33333 9.58333C3.33384 8.26813 3.70051 6.97904 4.39227 5.86045C5.08402 4.74187 6.07355 3.83797 7.25 3.25C8.23176 2.75411 9.31678 2.49713 10.4167 2.5H10.8333C12.5703 2.59583 14.2109 3.32897 15.4409 4.55905C16.671 5.78913 17.4042 7.42971 17.5 9.16667V9.58333Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Become a buddy",
    href: "/become-buddy",
    icon: () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3332 17.5V15.8333C13.3332 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 9.99984 12.5H4.99984C4.11578 12.5 3.26794 12.8512 2.64281 13.4763C2.01769 14.1014 1.6665 14.9493 1.6665 15.8333V17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.50016 9.16667C9.34102 9.16667 10.8335 7.67416 10.8335 5.83333C10.8335 3.99251 9.34102 2.5 7.50016 2.5C5.65931 2.5 4.1665 3.99251 4.1665 5.83333C4.1665 7.67416 5.65931 9.16667 7.50016 9.16667Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3332 17.5V15.8333C18.3327 15.0948 18.087 14.3773 17.6345 13.7936C17.182 13.2099 16.5484 12.793 15.8332 12.6083"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3335 2.60834C14.0503 2.79192 14.6855 3.20892 15.1391 3.79359C15.5928 4.37827 15.8391 5.09736 15.8391 5.83751C15.8391 6.57766 15.5928 7.29675 15.1391 7.88143C14.6855 8.4661 14.0503 8.8831 13.3335 9.06668"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Help",
    href: "/help",
    icon: () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0002 18.3334C14.6025 18.3334 18.3335 14.6024 18.3335 10C18.3335 5.39765 14.6025 1.66669 10.0002 1.66669C5.39783 1.66669 1.66687 5.39765 1.66687 10C1.66687 14.6024 5.39783 18.3334 10.0002 18.3334Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.57495 7.5C7.77087 6.94306 8.15758 6.47342 8.66658 6.17428C9.17558 5.87513 9.77403 5.76578 10.3559 5.86559C10.9378 5.9654 11.4656 6.26903 11.8555 6.72239C12.2454 7.17575 12.4749 7.75114 12.5 8.35C12.5 10 9.99995 10.825 9.99995 10.825"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14.1667H10.0083"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Log out",
    action: signOut,
    icon: () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
          stroke="#FF4D4D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3335 14.1667L17.5002 10L13.3335 5.83334"
          stroke="#FF4D4D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 10H7.5"
          stroke="#FF4D4D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    className: "text-red-500",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <>
      <header className="relative">
        <div className="-z-20 absolute inset-0 bg-primary" />
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 lg:px-16 py-4">
          <Link
            href="/"
            className="font-bold text-2xl text-white relative z-20 "
          >
            <img src="./logo.svg" alt="logo" className="h-6" />
          </Link>
          <div className="flex items-center gap-4 2xl:gap-12">
            <div className="items-center order-2 lg:order-1">
              {
                <div
                  className={cn(
                    "absolute z-20 p-4 lg:p-0 right-4 top-16 lg:top-0 lg:relative gap-3 lg:gap-9 2xl:gap-12  flex-col lg:flex-row bg-white lg:bg-transparent rounded-xl",
                    {
                      "hidden lg:flex": !isMenuOpen,
                      flex: isMenuOpen,
                    },
                  )}
                >
                  {NAVBAR_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block font-normal lg:font-semibold text-base text-black lg:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              }
              <button
                className="relative z-20 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon color="white" />
              </button>
            </div>
            {loading ? (
              <div className="h-10 md:h-12" />
            ) : user ? (
              <div className="relative order-1 lg:order-2 group">
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-10 lg:size-12 p-0 z-20 [&_svg]:size-6 text-primary"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.431 13.2502C13.4791 11.6046 12.0122 10.4246 10.3003 9.86524C11.1471 9.36115 11.805 8.59303 12.173 7.67886C12.5409 6.76468 12.5987 5.75499 12.3372 4.80483C12.0758 3.85468 11.5098 3.01661 10.7259 2.41931C9.94213 1.82202 8.98392 1.49854 7.99846 1.49854C7.013 1.49854 6.05479 1.82202 5.27098 2.41931C4.48716 3.01661 3.92108 3.85468 3.65967 4.80483C3.39826 5.75499 3.45598 6.76468 3.82395 7.67886C4.19193 8.59303 4.84982 9.36115 5.69659 9.86524C3.98471 10.424 2.51784 11.604 1.56596 13.2502C1.53105 13.3072 1.5079 13.3705 1.49787 13.4365C1.48783 13.5025 1.49112 13.5699 1.50754 13.6346C1.52396 13.6993 1.55317 13.7601 1.59346 13.8133C1.63374 13.8666 1.68428 13.9112 1.7421 13.9446C1.79992 13.978 1.86384 13.9995 1.93009 14.0078C1.99634 14.0161 2.06358 14.011 2.12785 13.9929C2.19211 13.9748 2.2521 13.944 2.30427 13.9023C2.35643 13.8606 2.39972 13.8089 2.43159 13.7502C3.60909 11.7152 5.69034 10.5002 7.99846 10.5002C10.3066 10.5002 12.3878 11.7152 13.5653 13.7502C13.5972 13.8089 13.6405 13.8606 13.6927 13.9023C13.7448 13.944 13.8048 13.9748 13.8691 13.9929C13.9333 14.011 14.0006 14.0161 14.0668 14.0078C14.1331 13.9995 14.197 13.978 14.2548 13.9446C14.3126 13.9112 14.3632 13.8666 14.4035 13.8133C14.4438 13.7601 14.473 13.6993 14.4894 13.6346C14.5058 13.5699 14.5091 13.5025 14.4991 13.4365C14.489 13.3705 14.4659 13.3072 14.431 13.2502ZM4.49846 6.00024C4.49846 5.308 4.70373 4.63131 5.08832 4.05574C5.4729 3.48017 6.01953 3.03156 6.65907 2.76666C7.29861 2.50175 8.00234 2.43244 8.68128 2.56749C9.36021 2.70254 9.98385 3.03588 10.4733 3.52536C10.9628 4.01485 11.2962 4.63849 11.4312 5.31742C11.5663 5.99635 11.4969 6.70009 11.232 7.33963C10.9671 7.97917 10.5185 8.52579 9.94296 8.91038C9.36738 9.29496 8.6907 9.50024 7.99846 9.50024C7.07051 9.49924 6.18085 9.13018 5.52468 8.47401C4.86852 7.81785 4.49945 6.92819 4.49846 6.00024Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
                <div className="absolute right-0 pt-2 z-30 w-64 hidden group-hover:block">
                  <div className="rounded-xl bg-white shadow-lg py-3 border border-[#E6E6E6]">
                    {USER_MENU_ITEMS.map((item) =>
                      item.action ? (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-50",
                            item.className,
                          )}
                        >
                          <item.icon />
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href!}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
                            item.className,
                          )}
                        >
                          <item.icon />
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="secondary"
                className="h-auto px-8 py-2 lg:py-2.5 order-1 lg:order-2 relative z-20"
                asChild
              >
                <Link
                  href="/login"
                  className="block text-sm lg:text-xl leading-6"
                >
                  Log in
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-10"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  BadgeCheckIcon,
  IdCardIcon,
  Package2Icon,
  PlaneIcon,
  UserCircleIcon,
  UsersRoundIcon,
} from "lucide-react";

const WORKING_STEPS = [
  {
    title: "Plan Your Journey",
    description:
      "Enter your travel details, including destination and dates, to find a travel companion heading your way.",
    category: "travel",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1663 10.2762L23.8088 6.84875L23.83 6.8275C24.5802 6.07727 25.0017 5.05973 25.0017 3.99875C25.0017 2.93776 24.5802 1.92023 23.83 1.17C23.0798 0.419767 22.0622 -0.00170898 21.0013 -0.00170898C19.9403 -0.00170898 18.9227 0.419767 18.1725 1.17C18.1725 1.1775 18.1588 1.18375 18.1513 1.19125L14.7238 4.83375L4.34876 1.05875C4.16994 0.99371 3.97628 0.981038 3.79052 1.02222C3.60475 1.0634 3.43459 1.15673 3.30001 1.29125L0.300009 4.29125C0.19547 4.39587 0.11544 4.52238 0.065684 4.66166C0.0159283 4.80094 -0.00231359 4.94952 0.0122727 5.0967C0.0268591 5.24387 0.0739103 5.38599 0.150036 5.51279C0.226163 5.63959 0.329468 5.74793 0.452509 5.83L8.43876 11.1537L6.58626 13H4.00001C3.73515 13.0001 3.48115 13.1053 3.29376 13.2925L0.293759 16.2925C0.176761 16.4092 0.0905118 16.5531 0.0427236 16.7113C-0.00506473 16.8695 -0.0129021 17.0371 0.0199124 17.199C0.0527268 17.361 0.12517 17.5123 0.230764 17.6394C0.336358 17.7666 0.471811 17.8655 0.625009 17.9275L5.22751 19.7687L7.06501 24.3625L7.07251 24.3825C7.13608 24.5364 7.23706 24.6719 7.36629 24.7769C7.49552 24.8819 7.64891 24.9529 7.81255 24.9836C7.97618 25.0142 8.14489 25.0036 8.30336 24.9525C8.46182 24.9015 8.60504 24.8117 8.72001 24.6912L11.7038 21.7062C11.7971 21.6138 11.8713 21.5038 11.9222 21.3826C11.973 21.2614 11.9995 21.1314 12 21V18.4137L13.845 16.5687L19.1688 24.555C19.2508 24.678 19.3592 24.7813 19.486 24.8575C19.6128 24.9336 19.7549 24.9806 19.9021 24.9952C20.0492 25.0098 20.1978 24.9916 20.3371 24.9418C20.4764 24.8921 20.6029 24.812 20.7075 24.7075L23.7075 21.7075C23.842 21.5729 23.9354 21.4028 23.9765 21.217C24.0177 21.0312 24.005 20.8376 23.94 20.6587L20.1663 10.2762ZM20.1575 22.43L14.8338 14.445C14.7521 14.321 14.644 14.2168 14.517 14.1398C14.3901 14.0628 14.2477 14.0151 14.1 14C14.0663 14 14.0338 14 14.0013 14C13.8698 14.0001 13.7397 14.026 13.6183 14.0764C13.4969 14.1268 13.3866 14.2007 13.2938 14.2937L10.2938 17.2937C10.1061 17.4809 10.0005 17.735 10 18V20.5862L8.36626 22.22L6.92876 18.625C6.87846 18.5002 6.8035 18.3868 6.70834 18.2917C6.61319 18.1965 6.49982 18.1215 6.37501 18.0712L2.78251 16.6337L4.41501 15H7.00001C7.13137 15.0001 7.26146 14.9743 7.38286 14.9241C7.50425 14.8739 7.61457 14.8003 7.70751 14.7075L10.7075 11.7075C10.8123 11.6029 10.8925 11.4763 10.9424 11.3369C10.9923 11.1975 11.0106 11.0487 10.996 10.9014C10.9814 10.754 10.9343 10.6118 10.858 10.4849C10.7818 10.3579 10.6783 10.2495 10.555 10.1675L2.57001 4.8425L4.25751 3.15625L14.66 6.93875C14.8433 7.00609 15.0423 7.01831 15.2324 6.97388C15.4226 6.92946 15.5955 6.83033 15.73 6.68875L19.5975 2.575C19.9745 2.20906 20.4803 2.00614 21.0056 2.01009C21.531 2.01405 22.0337 2.22456 22.4051 2.59613C22.7765 2.96771 22.9868 3.47051 22.9905 3.99586C22.9943 4.52122 22.7911 5.02695 22.425 5.40375L18.3163 9.27C18.1747 9.40447 18.0756 9.57744 18.0311 9.76758C17.9867 9.95773 17.9989 10.1567 18.0663 10.34L21.8488 20.7425L20.1575 22.43Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Match and Connect",
    description:
      "Browse verified profiles and choose a companion that meets your preferences. Send a request, complete the payment, and finalize your plans.",
    category: "travel",
    icon: (
      <svg
        width="32"
        height="22"
        viewBox="0 0 32 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.7874 7.48877L28.5974 1.10627C28.4799 0.871355 28.3173 0.661888 28.1188 0.489833C27.9203 0.317778 27.6899 0.186505 27.4407 0.10351C27.1915 0.0205161 26.9284 -0.0125737 26.6664 0.00613068C26.4043 0.0248351 26.1486 0.0949676 25.9137 0.212522L22.8049 1.76627L16.2562 0.0337725C16.0882 -0.0099554 15.9117 -0.0099554 15.7437 0.0337725L9.19495 1.76627L6.08619 0.212522C5.8513 0.0949676 5.59554 0.0248351 5.33354 0.00613068C5.07153 -0.0125737 4.80841 0.0205161 4.5592 0.10351C4.30998 0.186505 4.07956 0.317778 3.88108 0.489833C3.6826 0.661888 3.51996 0.871355 3.40245 1.10627L0.212445 7.48752C0.0948904 7.72242 0.0247582 7.97817 0.00605377 8.24018C-0.0126506 8.50218 0.0204391 8.7653 0.103433 9.01452C0.186428 9.26373 0.317701 9.49416 0.489756 9.69264C0.661811 9.89111 0.871278 10.0538 1.1062 10.1713L4.48119 11.86L11.4174 16.8138C11.5197 16.8865 11.6345 16.9395 11.7562 16.97L19.7562 18.97C19.9237 19.012 20.0993 19.0099 20.2658 18.9639C20.4323 18.9179 20.584 18.8296 20.7062 18.7075L27.5899 11.8225L30.8924 10.1713C31.3666 9.93393 31.727 9.51805 31.8946 9.01504C32.0622 8.51202 32.0232 7.96304 31.7862 7.48877H31.7874ZM24.9262 11.66L20.6249 8.21502C20.4323 8.06071 20.1893 7.98312 19.9428 7.9972C19.6964 8.01127 19.4638 8.11602 19.2899 8.29127C17.0637 10.5338 14.5824 10.25 12.9999 9.25002L18.4049 4.00002H22.3812L25.7824 10.8013L24.9262 11.66ZM5.1912 2.00002L7.74995 3.27752L4.5537 9.65877L1.99995 8.38252L5.1912 2.00002ZM19.6912 16.8913L12.4274 15.0763L6.27745 10.6838L9.77745 3.68377L15.9999 2.03502L17.2249 2.35877L11.5999 7.81877L11.5899 7.83002C11.3782 8.04176 11.2167 8.29835 11.1174 8.58085C11.0181 8.86334 10.9834 9.16454 11.0161 9.4622C11.0487 9.75987 11.1478 10.0464 11.3059 10.3007C11.4641 10.5549 11.6774 10.7704 11.9299 10.9313C14.4999 12.5725 17.6012 12.3063 20.0437 10.3063L23.4999 13.0825L19.6912 16.8913ZM27.4412 9.65752L24.2512 3.28252L26.8087 2.00002L29.9999 8.38252L27.4412 9.65752ZM16.4724 21.2413C16.4184 21.4574 16.2938 21.6493 16.1183 21.7865C15.9428 21.9238 15.7265 21.9985 15.5037 21.9988C15.4215 21.9987 15.3397 21.9886 15.2599 21.9688L10.0512 20.6663C9.92937 20.6362 9.81439 20.5832 9.71245 20.51L6.41869 18.1575C6.21617 17.9985 6.08279 17.7675 6.04633 17.5126C6.00986 17.2577 6.07312 16.9986 6.22294 16.7892C6.37275 16.5797 6.59757 16.4362 6.85058 16.3884C7.1036 16.3406 7.3653 16.3922 7.5812 16.5325L10.7199 18.775L15.7499 20.03C16.0072 20.0944 16.2283 20.2583 16.3648 20.4856C16.5012 20.713 16.5417 20.9853 16.4774 21.2425L16.4724 21.2413Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Travel Together",
    description:
      "Meet your companion, travel with ease, and make your trip both comfortable and enjoyable with the assurance of Buddy On board's verified community.",
    category: "travel",
    icon: (
      <svg
        width="28"
        height="27"
        viewBox="0 0 28 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8C12 7.60444 12.1173 7.21776 12.3371 6.88886C12.5568 6.55996 12.8692 6.30362 13.2346 6.15224C13.6001 6.00087 14.0022 5.96126 14.3902 6.03843C14.7781 6.1156 15.1345 6.30608 15.4142 6.58579C15.6939 6.86549 15.8844 7.22186 15.9616 7.60982C16.0387 7.99778 15.9991 8.39991 15.8478 8.76537C15.6964 9.13082 15.44 9.44318 15.1111 9.66294C14.7822 9.8827 14.3956 10 14 10C13.4696 10 12.9609 9.78929 12.5858 9.41421C12.2107 9.03914 12 8.53043 12 8ZM6 8C6 5.87827 6.84285 3.84344 8.34315 2.34315C9.84344 0.842855 11.8783 0 14 0C16.1217 0 18.1566 0.842855 19.6569 2.34315C21.1571 3.84344 22 5.87827 22 8C22 15.4938 14.8025 19.6925 14.5 19.8687C14.3489 19.9551 14.1778 20.0006 14.0037 20.0006C13.8297 20.0006 13.6586 19.9551 13.5075 19.8687C13.1975 19.6925 6 15.5 6 8ZM8 8C8 13.275 12.48 16.7763 14 17.8125C15.5187 16.7775 20 13.275 20 8C20 6.4087 19.3679 4.88258 18.2426 3.75736C17.1174 2.63214 15.5913 2 14 2C12.4087 2 10.8826 2.63214 9.75736 3.75736C8.63214 4.88258 8 6.4087 8 8ZM23.3463 16.4538C23.1001 16.3724 22.832 16.3899 22.5985 16.5024C22.365 16.6149 22.1843 16.8137 22.0945 17.0568C22.0047 17.3 22.0128 17.5685 22.1171 17.8058C22.2215 18.0431 22.4139 18.2306 22.6537 18.3288C24.7175 19.0925 26 20.115 26 21C26 22.67 21.435 25 14 25C6.565 25 2 22.67 2 21C2 20.115 3.2825 19.0925 5.34625 18.33C5.58614 18.2318 5.77853 18.0443 5.88286 17.807C5.98719 17.5697 5.99531 17.3012 5.90551 17.0581C5.8157 16.8149 5.63499 16.6161 5.40147 16.5036C5.16795 16.3911 4.89987 16.3737 4.65375 16.455C1.6525 17.5612 0 19.1762 0 21C0 24.8975 7.21375 27 14 27C20.7863 27 28 24.8975 28 21C28 19.1762 26.3475 17.5613 23.3463 16.4538Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Find a Buddy Courier",
    description:
      "Share your package details including the pictures and discover verified travelers heading to your destination.",
    category: "courier",
    icon: (
      <svg
        width="28"
        height="26"
        viewBox="0 0 28 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.8649 23.5C24.9611 20.2087 22.0274 17.8487 18.6036 16.73C20.2971 15.7218 21.6129 14.1856 22.3489 12.3572C23.0848 10.5289 23.2002 8.50948 22.6774 6.60918C22.1546 4.70887 21.0225 3.03272 19.4548 1.83814C17.8872 0.643552 15.9708 -0.00341797 13.9999 -0.00341797C12.0289 -0.00341797 10.1125 0.643552 8.54488 1.83814C6.97725 3.03272 5.84509 4.70887 5.32228 6.60918C4.79946 8.50948 4.91489 10.5289 5.65083 12.3572C6.38678 14.1856 7.70256 15.7218 9.3961 16.73C5.97235 17.8475 3.0386 20.2075 1.13485 23.5C1.06504 23.6138 1.01873 23.7405 0.998661 23.8725C0.978593 24.0045 0.985171 24.1392 1.01801 24.2687C1.05084 24.3981 1.10927 24.5197 1.18984 24.6262C1.27041 24.7326 1.3715 24.8219 1.48713 24.8887C1.60277 24.9555 1.73061 24.9985 1.86311 25.015C1.99561 25.0316 2.1301 25.0215 2.25863 24.9853C2.38716 24.949 2.50713 24.8874 2.61146 24.8041C2.71579 24.7207 2.80238 24.6173 2.8661 24.5C5.2211 20.43 9.3836 18 13.9999 18C18.6161 18 22.7786 20.43 25.1336 24.5C25.1973 24.6173 25.2839 24.7207 25.3882 24.8041C25.4926 24.8874 25.6125 24.949 25.7411 24.9853C25.8696 25.0215 26.0041 25.0316 26.1366 25.015C26.2691 24.9985 26.3969 24.9555 26.5126 24.8887C26.6282 24.8219 26.7293 24.7326 26.8099 24.6262C26.8904 24.5197 26.9489 24.3981 26.9817 24.2687C27.0145 24.1392 27.0211 24.0045 27.001 23.8725C26.981 23.7405 26.9347 23.6138 26.8649 23.5ZM6.99985 8.99998C6.99985 7.61551 7.41039 6.26214 8.17956 5.11099C8.94873 3.95985 10.042 3.06264 11.3211 2.53283C12.6002 2.00301 14.0076 1.86439 15.3655 2.13449C16.7234 2.40458 17.9706 3.07127 18.9496 4.05023C19.9286 5.0292 20.5953 6.27648 20.8653 7.63435C21.1354 8.99222 20.9968 10.3997 20.467 11.6788C19.9372 12.9578 19.04 14.0511 17.8888 14.8203C16.7377 15.5894 15.3843 16 13.9999 16C12.1439 15.998 10.3646 15.2599 9.0523 13.9475C7.73997 12.6352 7.00184 10.8559 6.99985 8.99998Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Connect and Confirm",
    description:
      "Confirm your Buddy Courier, complete the payment, and finalize the courier arrangement.",
    category: "courier",
    icon: (
      <svg
        width="32"
        height="22"
        viewBox="0 0 32 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.7874 7.48877L28.5974 1.10627C28.4799 0.871355 28.3173 0.661888 28.1188 0.489833C27.9203 0.317778 27.6899 0.186505 27.4407 0.10351C27.1915 0.0205161 26.9284 -0.0125737 26.6664 0.00613068C26.4043 0.0248351 26.1486 0.0949676 25.9137 0.212522L22.8049 1.76627L16.2562 0.0337725C16.0882 -0.0099554 15.9117 -0.0099554 15.7437 0.0337725L9.19495 1.76627L6.08619 0.212522C5.8513 0.0949676 5.59554 0.0248351 5.33354 0.00613068C5.07153 -0.0125737 4.80841 0.0205161 4.5592 0.10351C4.30998 0.186505 4.07956 0.317778 3.88108 0.489833C3.6826 0.661888 3.51996 0.871355 3.40245 1.10627L0.212445 7.48752C0.0948904 7.72242 0.0247582 7.97817 0.00605377 8.24018C-0.0126506 8.50218 0.0204391 8.7653 0.103433 9.01452C0.186428 9.26373 0.317701 9.49416 0.489756 9.69264C0.661811 9.89111 0.871278 10.0538 1.1062 10.1713L4.48119 11.86L11.4174 16.8138C11.5197 16.8865 11.6345 16.9395 11.7562 16.97L19.7562 18.97C19.9237 19.012 20.0993 19.0099 20.2658 18.9639C20.4323 18.9179 20.584 18.8296 20.7062 18.7075L27.5899 11.8225L30.8924 10.1713C31.3666 9.93393 31.727 9.51805 31.8946 9.01504C32.0622 8.51202 32.0232 7.96304 31.7862 7.48877H31.7874ZM24.9262 11.66L20.6249 8.21502C20.4323 8.06071 20.1893 7.98312 19.9428 7.9972C19.6964 8.01127 19.4638 8.11602 19.2899 8.29127C17.0637 10.5338 14.5824 10.25 12.9999 9.25002L18.4049 4.00002H22.3812L25.7824 10.8013L24.9262 11.66ZM5.1912 2.00002L7.74995 3.27752L4.5537 9.65877L1.99995 8.38252L5.1912 2.00002ZM19.6912 16.8913L12.4274 15.0763L6.27745 10.6838L9.77745 3.68377L15.9999 2.03502L17.2249 2.35877L11.5999 7.81877L11.5899 7.83002C11.3782 8.04176 11.2167 8.29835 11.1174 8.58085C11.0181 8.86334 10.9834 9.16454 11.0161 9.4622C11.0487 9.75987 11.1478 10.0464 11.3059 10.3007C11.4641 10.5549 11.6774 10.7704 11.9299 10.9313C14.4999 12.5725 17.6012 12.3063 20.0437 10.3063L23.4999 13.0825L19.6912 16.8913ZM27.4412 9.65752L24.2512 3.28252L26.8087 2.00002L29.9999 8.38252L27.4412 9.65752ZM16.4724 21.2413C16.4184 21.4574 16.2938 21.6493 16.1183 21.7865C15.9428 21.9238 15.7265 21.9985 15.5037 21.9988C15.4215 21.9987 15.3397 21.9886 15.2599 21.9688L10.0512 20.6663C9.92937 20.6362 9.81439 20.5832 9.71245 20.51L6.41869 18.1575C6.21617 17.9985 6.08279 17.7675 6.04633 17.5126C6.00986 17.2577 6.07312 16.9986 6.22294 16.7892C6.37275 16.5797 6.59757 16.4362 6.85058 16.3884C7.1036 16.3406 7.3653 16.3922 7.5812 16.5325L10.7199 18.775L15.7499 20.03C16.0072 20.0944 16.2283 20.2583 16.3648 20.4856C16.5012 20.713 16.5417 20.9853 16.4774 21.2425L16.4724 21.2413Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Receive Updates",
    description:
      "Stay informed with updates from the traveler until your package is safely delivered.",
    category: "courier",
    icon: (
      <svg
        width="28"
        height="27"
        viewBox="0 0 28 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8C12 7.60444 12.1173 7.21776 12.3371 6.88886C12.5568 6.55996 12.8692 6.30362 13.2346 6.15224C13.6001 6.00087 14.0022 5.96126 14.3902 6.03843C14.7781 6.1156 15.1345 6.30608 15.4142 6.58579C15.6939 6.86549 15.8844 7.22186 15.9616 7.60982C16.0387 7.99778 15.9991 8.39991 15.8478 8.76537C15.6964 9.13082 15.44 9.44318 15.1111 9.66294C14.7822 9.8827 14.3956 10 14 10C13.4696 10 12.9609 9.78929 12.5858 9.41421C12.2107 9.03914 12 8.53043 12 8ZM6 8C6 5.87827 6.84285 3.84344 8.34315 2.34315C9.84344 0.842855 11.8783 0 14 0C16.1217 0 18.1566 0.842855 19.6569 2.34315C21.1571 3.84344 22 5.87827 22 8C22 15.4938 14.8025 19.6925 14.5 19.8687C14.3489 19.9551 14.1778 20.0006 14.0037 20.0006C13.8297 20.0006 13.6586 19.9551 13.5075 19.8687C13.1975 19.6925 6 15.5 6 8ZM8 8C8 13.275 12.48 16.7763 14 17.8125C15.5187 16.7775 20 13.275 20 8C20 6.4087 19.3679 4.88258 18.2426 3.75736C17.1174 2.63214 15.5913 2 14 2C12.4087 2 10.8826 2.63214 9.75736 3.75736C8.63214 4.88258 8 6.4087 8 8ZM23.3463 16.4538C23.1001 16.3724 22.832 16.3899 22.5985 16.5024C22.365 16.6149 22.1843 16.8137 22.0945 17.0568C22.0047 17.3 22.0128 17.5685 22.1171 17.8058C22.2215 18.0431 22.4139 18.2306 22.6537 18.3288C24.7175 19.0925 26 20.115 26 21C26 22.67 21.435 25 14 25C6.565 25 2 22.67 2 21C2 20.115 3.2825 19.0925 5.34625 18.33C5.58614 18.2318 5.77853 18.0443 5.88286 17.807C5.98719 17.5697 5.99531 17.3012 5.90551 17.0581C5.8157 16.8149 5.63499 16.6161 5.40147 16.5036C5.16795 16.3911 4.89987 16.3737 4.65375 16.455C1.6525 17.5612 0 19.1762 0 21C0 24.8975 7.21375 27 14 27C20.7863 27 28 24.8975 28 21C28 19.1762 26.3475 17.5613 23.3463 16.4538Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export default function Working() {
  const [type, setType] = useState<"travel" | "courier">("travel");

  const STEPS = WORKING_STEPS.filter((step) => step.category === type);

  return (
    <>
      <div
        className="pb-"
        style={{
          backgroundImage: "url(./light-bg.png)",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-end gap-12 max-w-screen-2xl m-auto p-16">
          <div className="space-y-8 flex-1">
            <h3 className="font-merriweather text-[2.5rem] leading-tight">
              Travel Stress-Free with Trusted Buddy Companions
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <UsersRoundIcon />
                </span>
                <span>
                  Match with reliable buddies based on specific preferences
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <IdCardIcon />
                </span>
                <span>
                  Travel Buddies are verified through a strict verification
                  process
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <PlaneIcon />
                </span>
                <span>
                  Enjoy a safe and stress-free journey with a trusted companion
                </span>
              </li>
            </ul>
          </div>
          <div
            className="flex-1 aspect-[636/280] relative bg-primary rounded-2xl"
            style={{
              backgroundImage: "url(./blue-bg.png)",
              backgroundSize: "cover",
            }}
          >
            <img
              src="./elder-support-2.png"
              alt=""
              className="absolute inset-x-0 bottom-0"
            />
          </div>
        </div>
        <div className="flex items-end gap-12 max-w-screen-2xl m-auto p-16">
          <div
            className="flex-1 aspect-[636/280] relative bg-primary rounded-2xl"
            style={{
              backgroundImage: "url(./blue-bg.png)",
              backgroundSize: "cover",
            }}
          >
            <img
              src="./handover-2.png"
              alt=""
              className="absolute inset-x-0 bottom-0"
            />
          </div>
          <div className="space-y-8 flex-1">
            <h3 className="font-merriweather text-[2.5rem] leading-tight">
              Ship Easily with Buddy Couriers
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <UserCircleIcon />
                </span>
                <span>
                  Connect with verified Courier Buddies traveling to your
                  destination
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <Package2Icon />
                </span>
                <span>
                  Stay updated by keeping in touch throughout the delivery
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">
                  <BadgeCheckIcon />
                </span>
                <span>
                  Enjoy a cost-effective and faster alternative to traditional
                  couriers
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl m-auto px-16 py-16 space-y-4 flex flex-col">
        <h2 className="font-merriweather text-center text-[2.5rem]">
          Know how it all works
        </h2>
        <div
          className="group m-auto flex w-fit gap-2 rounded-full bg-[#F0F0F0] p-1"
          data-type={type}
        >
          <Button
            className="group-data-[type=travel]:bg-black text-[#A1A1A1] group-data-[type=travel]:text-white rounded-full"
            variant="ghost"
            onClick={() => setType("travel")}
          >
            A Travel Buddy
          </Button>
          <Button
            className="group-data-[type=courier]:bg-black text-[#A1A1A1] group-data-[type=courier]:text-white rounded-full"
            variant="ghost"
            onClick={() => setType("courier")}
          >
            A Buddy Courier{" "}
          </Button>
        </div>
        <div className="justify-center items-center inline-flex max-w-5xl m-auto">
          <div
            className="h-[468px] aspect-[4/3] relative bg-[#0d53e0] rounded-2xl"
            style={{
              backgroundImage: "url(./blue-bg.png)",
              backgroundSize: "cover",
            }}
          >
            {type === "travel" ? (
              <img
                src="./elder-support.png"
                alt=""
                className="absolute left-0 bottom-0"
              />
            ) : (
              <img
                src="./handover.png"
                alt=""
                className="absolute inset-x-0 top-0"
              />
            )}
          </div>
          <div className="max-w-xl flex-col justify-start items-start gap-3 inline-flex">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="p-4 bg-white rounded-lg shadow-[0px_8px_16px_0px_rgba(0,0,0,0.08)] justify-start items-center gap-6 inline-flex"
              >
                <div className="w-14 h-14 p-3.5 bg-[#0d53e0] rounded-lg justify-center items-center flex overflow-hidden">
                  {step.icon}
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="text-[#090909] text-base font-bold leading-snug">
                    {step.title}
                  </div>
                  <div className="self-stretch text-[#090909] text-base font-normal leading-snug">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

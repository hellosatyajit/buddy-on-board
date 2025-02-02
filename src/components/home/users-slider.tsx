import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const users = [
  {
    id: 1,
    departureTime: "08:30 AM",
    departureDate: "22 August, 2024",
    departureLocation: "LAX, USA",
    arrivalTime: "12:15 PM",
    arrivalDate: "22 August, 2024",
    arrivalLocation: "YVR, Canada",
    name: "Sarah T.",
    avatar: "https://avatar.iran.liara.run/public/1",
    rating: 4.2,
    languages: ["English", "French"],
  },
  {
    id: 2,
    departureTime: "10:00 AM",
    departureDate: "23 August, 2024",
    departureLocation: "JFK, USA",
    arrivalTime: "03:45 PM",
    arrivalDate: "23 August, 2024",
    arrivalLocation: "LHR, UK",
    name: "John D.",
    avatar: "https://avatar.iran.liara.run/public/2",
    rating: 4.5,
    languages: ["English", "Spanish"],
  },
  {
    id: 3,
    departureTime: "02:15 PM",
    departureDate: "24 August, 2024",
    departureLocation: "CDG, France",
    arrivalTime: "06:30 PM",
    arrivalDate: "24 August, 2024",
    arrivalLocation: "FCO, Italy",
    name: "Emma L.",
    avatar: "https://avatar.iran.liara.run/public/3",
    rating: 4.8,
    languages: ["French", "Italian"],
  },
  {
    id: 4,
    departureTime: "11:45 AM",
    departureDate: "25 August, 2024",
    departureLocation: "SYD, Australia",
    arrivalTime: "05:20 PM",
    arrivalDate: "25 August, 2024",
    arrivalLocation: "NRT, Japan",
    name: "Alex W.",
    avatar: "https://avatar.iran.liara.run/public/4",
    rating: 4.3,
    languages: ["English", "Japanese"],
  },
  {
    id: 5,
    departureTime: "09:30 AM",
    departureDate: "26 August, 2024",
    departureLocation: "DXB, UAE",
    arrivalTime: "02:45 PM",
    arrivalDate: "26 August, 2024",
    arrivalLocation: "SIN, Singapore",
    name: "Olivia H.",
    avatar: "https://avatar.iran.liara.run/public/5",
    rating: 4.6,
    languages: ["English", "Arabic"],
  },
];

function UsersCard({ data }: { data: (typeof users)[number] }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-[0px_4px_32px_0px_rgba(0,0,0,0.08)] flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-primary text-2xl font-semibold leading-[28.80px] tracking-tight">
            {data.departureTime}
          </div>
          <div className="w-[135px] text-[#a4a4a4] text-sm font-medium leading-[16.80px]">
            {data.departureDate}
          </div>
          <div className="self-stretch h-[19px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-[#a8a8a8] text-base font-medium leading-tight tracking-tight">
              {data.departureLocation}
            </div>
          </div>
        </div>
        <div className="bg-primary w-6 h-6 border-4 ring-4 ring-[#F7F7F7] border-[#EBEBEB] rounded-full flex items-center justify-center">
          <svg
            width="16"
            height="9"
            className="w-3"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0146 3.3499L15.381 4.71712C15.4134 4.83799 15.3964 4.96678 15.3338 5.07515C15.2713 5.18352 15.1682 5.26259 15.0473 5.29498L4.85416 8.02623C4.36415 8.15994 3.84396 8.13089 3.37188 7.94344C2.89981 7.75599 2.50138 7.4203 2.23655 6.98687L0.719273 4.53044C0.641987 4.40534 0.595005 4.26391 0.582076 4.11744C0.569147 3.97096 0.590629 3.82349 0.644807 3.68679C0.698986 3.55009 0.784362 3.42794 0.894124 3.33009C1.00389 3.23224 1.135 3.1614 1.277 3.12321L1.73274 3.00109C1.85346 2.96881 1.98206 2.98573 2.09032 3.04815L3.65543 3.95129L4.93663 3.60799L4.0127 2.21067C3.93028 2.08585 3.87872 1.94322 3.86226 1.79455C3.8458 1.64588 3.86492 1.49543 3.91804 1.3556C3.97116 1.21577 4.05676 1.09058 4.16778 0.990337C4.2788 0.890097 4.41206 0.817684 4.55657 0.779072L5.01231 0.656957C5.07216 0.640868 5.1346 0.63673 5.19605 0.644779C5.2575 0.652827 5.31677 0.672905 5.37046 0.703864L8.66857 2.60803L12.1254 1.68178C12.7297 1.51985 13.3736 1.60462 13.9155 1.91746C14.4573 2.23029 14.8527 2.74556 15.0146 3.3499Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="grow shrink basis-0 flex-col justify-start items-end gap-1 inline-flex">
          <div className="self-stretch text-right text-primary text-2xl font-semibold leading-[28.80px] tracking-tight">
            {data.arrivalTime}
          </div>
          <div className="w-[135px] text-right text-[#a4a4a4] text-sm font-medium leading-[16.80px]">
            {data.arrivalDate}
          </div>
          <div className="self-stretch h-[19px] flex-col justify-start items-start gap-1 flex">
            <div className="self-stretch text-right text-[#a8a8a8] text-base font-medium leading-tight tracking-tight">
              {data.arrivalLocation}
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[77px] flex-col justify-center items-start gap-3 flex">
        <div className="self-stretch justify-start items-center gap-3 inline-flex">
          <img
            className="w-[42px] h-[42px] relative rounded-[64px]"
            src={data.avatar}
          />
          <div className="justify-start items-center gap-1 flex">
            <div className="text-center text-[#1e1e1e] text-xl font-normal leading-normal">
              {data.name}
            </div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3944 6.88188L11.3925 6.88381C11.0937 7.19571 10.7847 7.51832 10.6206 7.91438C1+  0.4631 8.29563 10.4563 8.73125 10.45 9.15312C10.4437 9.59062 10.4369 10.0487 10.2425 10.2425C10.0481 10.4363 9.59312 10.4437 9.15312 10.45C8.73125 10.4563 8.29563 10.4631 7.91438 10.6206C7.51832 10.7847 7.19571 11.0937 6.88381 11.3925L11.3944 11.3955C6.5686 11.6945 6.2497 12 6 12C5.75 12 5.42812 11.6925 5.11812 11.3944C4.80813 11.0962 4.4825 10.785 4.08563 10.6206C3.70438 10.4631 3.26875 10.4563 2.84688 10.45C2.40938 10.4437 1.95125 10.4369 1.7575 10.2425C1.56375 10.0481 1.55625 9.59312 1.55 9.15312C1.54375 8.73125 1.53688 8.29563 1.37937 7.91438C1.21534 7.51832 0.906276 7.19571 0.607474 6.88381L0.605625 6.88188L0.604546 6.88075C0.305514 6.56861 0 6.2497 0 6C0 5.75 0.3075 5.42812 0.605625 5.11812C0.90375 4.80813 1.215 4.4825 1.37937 4.08563C1.53688 3.70438 1.54375 3.26875 1.55 2.84688C1.55625 2.40938 1.56312 1.95125 1.7575 1.7575C1.95187 1.56375 2.40688 1.55625 2.84688 1.55C3.26875 1.54375 3.70438 1.53688 4.08563 1.37937C4.48168 1.21534 4.80429 0.906276 5.11619 0.607474L5.11812 0.605625L5.11925 0.604546C5.43139 0.305514 5.7503 0 6 0C6.25 0 6.57188 0.3075 6.88188 0.605625C7.19188 0.90375 7.5175 1.215 7.91438 1.37937C8.29563 1.53688 8.73125 1.54375 9.15312 1.55C9.59062 1.55625 10.0487 1.56312 10.2425 1.7575C10.4363 1.95187 10.4437 2.40688 10.45 2.84688C10.4563 3.26875 10.4631 3.70438 10.6206 4.08563C10.7847 4.48168 11.0937 4.80429 11.3925 5.11619L11.3944 5.11812L11.3955 5.11926C11.6945 5.4314 12 5.7503 12 6C12 6.25 11.6925 6.57188 11.3944 6.88188Z"
                fill="#1F14F0"
              />
            </svg>
          </div>
        </div>
        <div className="self-stretch h-[23px] rounded-lg flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-start gap-1 inline-flex">
            <div className="self-stretch px-2 py-1 bg-[#1a6d4f] rounded-2xl justify-center items-center gap-0.5 flex overflow-hidden">
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0798 4.81883C13.0251 4.65068 12.9218 4.50248 12.7831 4.3929C12.6443 4.28332 12.4762 4.21726 12.2999 4.20305L9.07336 3.94274L7.82758 0.930002C7.76021 0.76584 7.64554 0.625419 7.49816 0.526593C7.35077 0.427767 7.17733 0.375 6.99988 0.375C6.82243 0.375 6.64899 0.427767 6.50161 0.526593C6.35423 0.625419 6.23956 0.76584 6.17219 0.930002L4.9275 3.94219L1.6993 4.20305C1.52275 4.21798 1.35454 4.28468 1.21574 4.39479C1.07693 4.5049 0.973706 4.65352 0.918994 4.82203C0.864282 4.99055 0.860517 5.17146 0.908169 5.34211C0.955821 5.51275 1.05277 5.66554 1.18688 5.78133L3.64781 7.90485L2.89805 11.08C2.85611 11.2525 2.86638 11.4336 2.92754 11.6002C2.98871 11.7669 3.09801 11.9116 3.24157 12.016C3.38514 12.1204 3.55649 12.1798 3.73388 12.1867C3.91127 12.1936 4.08669 12.1476 4.23789 12.0545L6.99961 10.3548L9.76297 12.0545C9.91422 12.1465 10.0893 12.1916 10.2661 12.1842C10.443 12.1768 10.6137 12.1173 10.7568 12.0131C10.8998 11.9089 11.0089 11.7647 11.0702 11.5987C11.1315 11.4326 11.1422 11.2522 11.1012 11.08L10.3487 7.9043L12.8096 5.78078C12.9448 5.66519 13.0426 5.51207 13.0907 5.34082C13.1388 5.16957 13.135 4.98791 13.0798 4.81883Z"
                  fill="white"
                />
              </svg>
              <div className="text-white text-sm font-normal leading-none">
                {data.rating}
              </div>
            </div>
            <div className="px-2 py-1 bg-[#f6bc40] rounded-2xl justify-center items-center gap-0.5 flex overflow-hidden">
              <div className="text-black text-sm font-normal leading-none">
                Speaks {data.languages.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UsersSlider() {
  return (
    <Carousel className="max-w-screen-2xl m-auto" opts={{ loop: true }}>
      <CarouselContent className="py-16">
        {users.map((user, index) => (
          <CarouselItem
            key={index}
            className="basis-11/12 sm:basis-1/2 md:basis-1/3 xl:basis-1/4 flex justify-center"
          >
            <UsersCard data={user} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[10%]" />
      <CarouselNext className="right-[10%]" />
    </Carousel>
  );
}

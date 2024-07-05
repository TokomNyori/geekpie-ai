"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import { mailSender } from "@/helpers/helperFun";

type ServicesType = {
  serviceOne: string;
  serviceTwo: string;
  serviceThree: string;
};

type InputDrawerProps = {
  drawerTitle: string;
  servicesOpt: ServicesType;
  children: React.ReactNode;
};

export default function InputDrawer({
  drawerTitle,
  servicesOpt,
  children,
}: InputDrawerProps) {
  const [getStartedForm, setGetStartedForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    service: "",
  });
  const [sendingReq, setSendingReq] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Data to be sent to K3 Gas Service
  const dataToGeekPie = {
    firstName: getStartedForm.firstName,
    lastName: getStartedForm.lastName,
    email: getStartedForm.email,
    mobile: getStartedForm.mobile,
    service: getStartedForm.service,
    subject: "New Service Inquiry Notification for GeekPie AI",
    mailType: "service",
  };

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setGetStartedForm({
      ...getStartedForm,
      [event.target.name]: event.target.value,
    });
  }

  const handleSelectChange = (value: string, name: string) => {
    setGetStartedForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  console.log(getStartedForm);

  async function handleMailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !getStartedForm.firstName ||
      !getStartedForm.lastName ||
      !getStartedForm.email ||
      !getStartedForm.mobile ||
      !getStartedForm.service
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (getStartedForm.mobile.length !== 10) {
      toast.error("Mobile number should be 10 digits");
      return;
    }

    if (closeBtnRef.current) {
      closeBtnRef.current.click();
    }

    setSendingReq(true);

    try {
      const res = await mailSender({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataToGeekPie,
      });
      console.log(res);
      toast.success("Request sent successfully", {
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Request failed. Please try again.");
    } finally {
      setSendingReq(false);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className={`flex flex-col items-center justify-center`}>
        {children}
      </DrawerTrigger>
      <DrawerContent
        className={`priority-z-index min-h-[55vh] border-0 bg-black text-gray-100`}
      >
        <div className="mx-auto flex w-full max-w-lg flex-col justify-between">
          <DrawerHeader className="relative flex items-center justify-start border-b border-zinc-500 px-4 pb-2 pt-4 md:px-0">
            {/* <DrawerTitle className='opacity-10 p-0 m-0 leading-none'>Consult</DrawerTitle> */}
            <DrawerTitle className="ml-1 text-xl font-bold uppercase leading-none tracking-widest">
              {drawerTitle}
            </DrawerTitle>
            <DrawerClose
              className="absolute right-4 top-0 md:right-0"
              ref={closeBtnRef}
            >
              <IoCloseCircleOutline className="text-4xl hover:text-red-400" />
            </DrawerClose>
          </DrawerHeader>
          <div className={`p-4 px-4 pb-0 pt-8 md:px-0`}>
            <form
              onSubmit={handleMailSubmit}
              className="flex w-full flex-col items-center justify-center gap-5 xl:gap-4"
            >
              <div className="flex w-full items-center justify-between gap-3">
                <Input
                  className={`rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
                  placeholder="First Name"
                  type="text"
                  required
                  name="firstName"
                  value={getStartedForm.firstName}
                  onChange={changeHandler}
                />
                <Input
                  className={`rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
                  placeholder="Last Name"
                  type="text"
                  required
                  name="lastName"
                  value={getStartedForm.lastName}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex w-full items-center justify-center">
                <Input
                  className={`rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
                  placeholder="Email"
                  type="email"
                  required
                  name="email"
                  value={getStartedForm.email}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex w-full items-center justify-center">
                <Input
                  className={`rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
                  placeholder="Mobile No. (10 digits)"
                  type="number"
                  required
                  name="mobile"
                  value={getStartedForm.mobile}
                  onChange={changeHandler}
                />
              </div>
              <div className="w-full">
                <Select
                  name="services"
                  value={getStartedForm.service}
                  onValueChange={(value) =>
                    handleSelectChange(value, "service")
                  }
                >
                  <SelectTrigger className="rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-0 bg-zinc-800 py-7 text-[1rem] text-gray-100 lg:py-6">
                    <SelectItem value={servicesOpt.serviceOne} className="">
                      {servicesOpt.serviceOne}
                    </SelectItem>
                    <SelectItem value={servicesOpt.serviceTwo}>
                      {servicesOpt.serviceTwo}
                    </SelectItem>
                    <SelectItem value={servicesOpt.serviceThree}>
                      {servicesOpt.serviceThree}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  className={`h-14 w-full rounded-xl border-0 bg-zinc-900 text-lg uppercase leading-none tracking-wider hover:bg-zinc-900 hover:brightness-125 lg:h-14 lg:text-[1rem]`}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <DrawerFooter className="py-4">
            {/* <Button className='text-lg leading-none tracking-wider uppercase'>Submit</Button> */}
          </DrawerFooter>
        </div>
      </DrawerContent>

      <div
        className={`${sendingReq ? "z-60 fixed left-0 top-0 h-full w-full backdrop-blur-sm" : "hidden"}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <PuffLoader
            color="#3B82F6CC"
            //cssOverride={override}
            size={230}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1}
          />
          <span className="animate-pulse text-xl capitalize tracking-widest text-gray-100 md:text-2xl">
            Sending request...
          </span>
        </div>
      </div>
    </Drawer>
  );
}

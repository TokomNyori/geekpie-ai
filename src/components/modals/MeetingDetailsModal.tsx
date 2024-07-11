import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { format, addDays } from "date-fns";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/libs/utils";
import { IoCloseCircleOutline } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MeetingDetails } from "@/helpers/typeScriptTypes";

type MeetingDetailsModalPropd = {
  loadMeetingModal: boolean;
  setLoadMeetingModal: React.Dispatch<boolean>;
  setMeetingDetails: React.Dispatch<any>;
  setMeetingDetailsSubmitted: React.Dispatch<any>;
};

const MeetingDetailsModal = ({
  loadMeetingModal,
  setLoadMeetingModal,
  setMeetingDetails,
  setMeetingDetailsSubmitted,
}: MeetingDetailsModalPropd) => {
  const [meetingForm, setMeetingForm] = useState<MeetingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    mode: "",
    service: "",
    meetingTime: "",
  });
  const [isVoiveCall, setIsVoiceCall] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const meetingModal = useRef(null);
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      if (loadMeetingModal && !isClosing) {
        tl.fromTo(
          ".meeting_box",
          { scale: 0, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 0.8 },
        );
      } else if (isClosing) {
        tl.fromTo(
          ".meeting_box",
          { scale: 1, opacity: 1 },
          {
            scale: 0,
            duration: 0.8,
            opacity: 0.5,
            onComplete: () => {
              setLoadMeetingModal(false);
              setIsClosing(false);
            },
          },
        );
      }
    },
    { scope: meetingModal, dependencies: [loadMeetingModal, isClosing] },
  );

  const date = new Date();
  const formattedDate = format(date, "dd/MMM/yyyy");

  const getConsecutiveDates = (startDate: string, numberOfDays: number) => {
    const dates = [];
    let idMark = 0;
    for (let i = 1; i < numberOfDays; i++) {
      const newDate = addDays(startDate, i);
      const formattedNewDate = format(newDate, "dd/MMM/yyyy");
      idMark++;
      const dateNtime1 = {
        id: `time:${idMark}`,
        date: formattedNewDate,
        time: "10 AM IST",
        utcTime: "(4:30 AM UTC)",
        textColor: "text-green-500",
      };

      idMark++;

      const dateNtime2 = {
        id: `time:${idMark}`,
        date: formattedNewDate,
        time: "5 PM IST",
        utcTime: "(11:30 AM UTC)",
        textColor: "text-blue-500",
      };
      dates.push(dateNtime1);
      dates.push(dateNtime2);
    }
    return dates;
  };

  const dateNtime = getConsecutiveDates(formattedDate, 3);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setMeetingForm({
      ...meetingForm,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  const handleSelectChange = (value: string, name: string) => {
    setMeetingForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    value !== "voice call" ? setIsVoiceCall(false) : setIsVoiceCall(true);
  };

  function handleIsclosing() {
    setIsClosing(true);
  }

  function handleMeetingDetailSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMeetingDetails(meetingForm);
    handleIsclosing();
    setMeetingDetailsSubmitted(true);
    setMeetingForm({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      mode: "",
      service: "",
      meetingTime: "",
    });
  }

  // console.log(meetingForm);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
      ref={meetingModal}
    >
      <div className="meeting_box flex w-full flex-col items-center justify-center rounded-xl border border-gray-500/50 bg-zinc-950 px-4 pb-6 pt-3 md:w-[95%]">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg">Enter Meeting Details</div>
          <div
            className="cursor-pointer text-4xl transition-colors duration-300 ease-in-out hover:text-red-500"
            onClick={() => handleIsclosing()}
          >
            <IoCloseCircleOutline />
          </div>
        </div>
        <form
          className="mt-5 flex flex-col items-center justify-start gap-4"
          onSubmit={handleMeetingDetailSubmit}
        >
          <div className="flex w-full items-center justify-between gap-3">
            <Input
              className={`rounded-lg border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
              placeholder="First Name"
              type="text"
              required
              name="firstName"
              value={meetingForm.firstName}
              onChange={(event) => changeHandler(event)}
            />
            <Input
              className={`rounded-lg border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
              placeholder="Last Name"
              type="text"
              required
              name="lastName"
              value={meetingForm.lastName}
              onChange={(event) => changeHandler(event)}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <Select
              name="mode"
              onValueChange={(value) => handleSelectChange(value, "mode")}
            >
              <SelectTrigger className="rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6">
                <SelectValue placeholder="Meeting Mode" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 bg-zinc-800 py-7 text-[1rem] text-gray-100 lg:py-6">
                <SelectItem value="voice call" className="">
                  Voice Call
                </SelectItem>
                <SelectItem value="zoom video call">Zoom Video Call</SelectItem>
                <SelectItem value="in person">In Person</SelectItem>
              </SelectContent>
            </Select>
            <Select
              name="services"
              onValueChange={(value) => handleSelectChange(value, "service")}
            >
              <SelectTrigger className="rounded-xl border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6">
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 bg-zinc-800 py-7 text-[1rem] text-gray-100 lg:py-6">
                <SelectItem value="Customer Service Chatbot">
                  Customer Service Chatbot
                </SelectItem>
                <SelectItem value="Chatbot UI Only">Chatbot UI Only</SelectItem>
                <SelectItem value="AI-based Microservices">
                  AI-based Microservices
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <Input
              className={`rounded-lg border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
              placeholder="Email"
              type="email"
              required
              name="email"
              value={meetingForm.email}
              onChange={(event) => changeHandler(event)}
            />
            {isVoiveCall && (
              <Input
                className={`rounded-lg border-0 bg-zinc-900 py-7 text-[1rem] lg:py-6`}
                placeholder="10 digits mobile number"
                type="tel"
                required
                name="mobile"
                value={meetingForm.mobile}
                onChange={(event) => changeHandler(event)}
              />
            )}
          </div>
          <div className="-mb-2 ml-1.5 w-full text-start text-[0.95rem]">
            Select Your Preferred Date and Time Slot
          </div>
          <div className="grid w-full grid-cols-2 gap-3">
            {dateNtime.map((dNt, index) => (
              <div key={index}>
                <input
                  checked={
                    meetingForm.meetingTime ===
                    `${dNt.date}, ${dNt.time} ${dNt.utcTime}`
                  }
                  id={dNt.id}
                  className="meeting-radio-btn hidden"
                  type="radio"
                  name="meetingTime"
                  value={`${dNt.date}, ${dNt.time} ${dNt.utcTime}`}
                  onChange={(event) => changeHandler(event)}
                />
                <Label
                  htmlFor={dNt.id}
                  className={cn(
                    "box-border flex cursor-pointer flex-col gap-1 rounded-xl bg-zinc-900 p-3 transition-opacity duration-300 ease-in-out hover:brightness-125",
                    dNt.textColor,
                  )}
                >
                  <p>{dNt.date}</p>
                  <p>{dNt.time}</p>
                  <p>{dNt.utcTime}</p>
                </Label>
              </div>
            ))}
          </div>
          <Button className="w-full rounded-lg border-0 bg-zinc-900 py-7 text-[1.2rem] transition-all duration-300 ease-in-out hover:bg-zinc-900 hover:brightness-125 lg:py-6">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MeetingDetailsModal;

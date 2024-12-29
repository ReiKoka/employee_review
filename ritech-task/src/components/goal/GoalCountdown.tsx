import { formatTime } from "@/utils/helperFunctions";
import { Goal } from "@/utils/types";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FaHourglassEnd } from "react-icons/fa6";

function GoalCountdown({ goal }: { goal: Goal }) {
  const totalDuration = differenceInSeconds(
    new Date(goal?.dueDate),
    new Date(goal?.createdAt),
  ); // Total duration from createdAt to dueDate

  const [timeRemaining, setTimeRemaining] = useState(
    differenceInSeconds(new Date(goal.dueDate), new Date()),
  ); // Initial remaining time

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeRemaining = differenceInSeconds(
        new Date(goal.dueDate),
        new Date(),
      );
      if (updatedTimeRemaining <= 0) {
        setTimeRemaining(0);
        clearInterval(interval);
      } else {
        setTimeRemaining(updatedTimeRemaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [goal.dueDate]);

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-card p-6 font-primary text-card-foreground shadow-custom dark:bg-muted">
      <h3 className="font-primary text-xl font-bold capitalize tracking-wide text-card-foreground">
        Time Remaining
      </h3>
      <div className="flex items-center justify-center p-4">
        <CountdownCircleTimer
          size={230}
          strokeWidth={timeRemaining > 0 ? 20 : 0}
          isPlaying={timeRemaining > 0}
          duration={totalDuration}
          initialRemainingTime={timeRemaining}
          colors={["#6225C5", "#c5257d", "#FF0000", "#A0A0A0"]}
          colorsTime={[
            totalDuration * 0.7,
            totalDuration * 0.4,
            totalDuration * 0.1,
            0,
          ]}
        >
          {({ remainingTime }) => {
            const days = Math.floor(remainingTime / 86400);
            const hours = Math.floor((remainingTime % 86400) / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            return remainingTime > 0 ? (
              <div className="flex flex-wrap items-center justify-center text-center font-primary text-2xl font-extrabold tracking-widest text-card-foreground">
                <span>{days === 0 ? "" : formatTime(days)}</span>
                <span>{days === 0 ? "" : ":"}</span>
                <span>{hours === 0 ? "" : formatTime(hours)}</span>
                <span>{hours === 0 ? "" : ":"}</span>
                <span>{minutes === 0 ? "" : formatTime(hours)}</span>
                <span>{minutes === 0 ? "" : ":"}</span>
                <span>{seconds === 0 ? "" : formatTime(seconds)}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <FaHourglassEnd />
                <p className="text-center font-primary text-2xl font-extrabold">
                  Time is up
                </p>
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default GoalCountdown;

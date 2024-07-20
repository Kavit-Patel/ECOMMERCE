"use client";
import { useRef } from "react";

const CodeVerification = ({
  setCode,
}: {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (e: HTMLInputElement, i: number) => {
    const value = e.value;
    setCode((prev) => prev + value);
    if (i < 5 && value !== "") {
      inputRef.current[i + 1]?.focus();
    }
  };
  return (
    <div className="flex w-full gap-5">
      {Array(6)
        .fill("")
        .map((el: string, i) => (
          <input
            onChange={(e) => handleChange(e.target, i)}
            type="text"
            id="code"
            maxLength={1}
            className="h-12 w-12 rounded-md border-2 border-[#C1C1C1] text-center text-xl text-black"
            key={i}
            ref={(el) => {
              inputRef.current[i] = el;
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                if (i > 0) {
                  if (e.currentTarget.value === "") {
                    inputRef.current[i - 1]?.focus();
                  }
                }
              }
            }}
          ></input>
        ))}
    </div>
  );
};

export default CodeVerification;

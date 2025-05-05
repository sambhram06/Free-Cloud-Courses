import { useEffect, useState } from "react";
 
const CourseTimeline = () => {
    const [currentStep, setCurrentStep] = useState(-1);
    const [isSuccess, setIsSuccess] = useState(false);
   
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentStep === 2) {
          setIsSuccess(true);
          setTimeout(() => {
            setCurrentStep(-1);
            setIsSuccess(false);
          }, 2000);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }, 2000);
   
      return () => clearInterval(interval);
    }, [currentStep]);
   
    const steps = ["Fundamental", "Intermediate", "Advanced"];
   
    return (
      <div className="relative flex justify-between items-left max-w-7xl mx-auto mb-14 px-1 ">
        {steps.map((step, index) => {
          const isPassed = currentStep > index;
          const isActive = currentStep >= index;
   
          const isFinalCompleted = currentStep === 2 && index === 2;
   
          return (
            <div
              key={step}
              className="flex flex-col items-center text-center w-1/3"
            >
              <div
                className="relative z-12 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                style={{
                  backgroundColor: isFinalCompleted
                    ? "#22c55e"
                    : isActive
                    ? "#FF9900"
                    : "#e2e8f0",
                  color: isFinalCompleted ? "#fff" : "#fff",
                  transition: "background-color 0.5s ease",
                }}
              >
                {isFinalCompleted ? "✓" : index + 1}
              </div>
              <div className="mt-2 text-sm text-gray-800 font-medium flex items-center gap-2">
                {step}
                {isFinalCompleted && isSuccess && (
                  <span className="text-green-600 font-bold text-base ml-2">
                    AWS Champion 🎉
                  </span>
                )}
              </div>
            </div>
          );
        })}
   
       
        <div className="absolute top-5 left-[15%] right-[15%] h-1 bg-gray-300 z-0 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF9900] transition-all duration-1000 ease-in-out"
            style={{
              width: `${(currentStep + 1) / steps.length * 100}%`,
            }}
          ></div>
        </div>
      </div>
    );
  };
   
  export default CourseTimeline;
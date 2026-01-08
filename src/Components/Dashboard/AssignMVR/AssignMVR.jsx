import { Link } from "react-router-dom";

const AssignMVR = () => {
  const requestData = [
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
    {
      name: "John Doe",
      problem: "Medical Condition: Breathing Problem and chest pain.",
    },
  ];
  return (
    <div className="  min-h-screen p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-base-color font-semibold">
          Assign MVR
        </h1>
      </div>
      <div className="mt-10 px-5 xl:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center gap-10">
        {requestData.map((data, i) => (
          <div
            key={i}
            className="bg-[#FDFDFD] p-4 rounded-lg"
            style={{ boxShadow: "0px 0px 5px 3px #00000040" }}
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl">
              Name: {data.name}
            </h1>
            <p className="my-3 text-[#4C5375] text-sm sm:text-base">
              {data.problem}
            </p>
            <div className="flex justify-between gap-3">
              <Link className="w-full" to={"/assign-mvr/6815327518099"}>
                <button className="bg-secondary-color text-primary-color border border-secondary-color px-2 w-full py-1 rounded-md font-semibold">
                  Assign
                </button>
              </Link>
              <button className="bg-[#FDFDFD] text-[#1A1A1A] border border-secondary-color px-2 w-full py-1 rounded-md font-semibold">
                Cancle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignMVR;

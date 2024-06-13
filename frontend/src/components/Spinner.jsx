import { ClipLoader } from "react-spinners";

const Spinner = ({ input_data }) => {
  return (
    <div className="flex justify-center items-center h-full m-2">
      <ClipLoader size={35} color={"#123abc"} loading={true} />
      <p className="ml-2">{input_data}</p>
    </div>
  );
};

export default Spinner;

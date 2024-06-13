import { useState } from "react";
import logo from "../assets/image.png";
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { fileStatusUpdate, setLoading } from "../store/dataSlice";
import { uploadFile } from "../utils/handleAPI";

const Header = () => {
  const [file_name, setFile_name] = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      //upload the file
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await uploadFile(formData);
      if (res.status == 200) {
        toast.success("File uploaded");
        setFile_name(selectedFile.name);
        // dispatch to store
        dispatch(setLoading(false));
        dispatch(fileStatusUpdate({ fileName: res.data.filename }));
      } else {
        toast.error("Internal Server error");
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="flex justify-between items-end p-4 shadow-sm">
      <img src={logo} alt="logo" className="w-24" />

      <div className="flex items-center">
        {file_name && <span className="mr-2 text-green-500">{file_name}</span>}

        <label className="relative bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          <span className="hidden sm:inline">+ Upload File</span>
          <span className="inline sm:hidden">+</span>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Header;

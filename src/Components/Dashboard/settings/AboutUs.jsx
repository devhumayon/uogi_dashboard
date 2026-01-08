import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
  useAddSettingsMutation,
  // useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log("about us data", getSettingsData?.data);

  // Mutations for adding and updating aboutUs
  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load aboutUs data on component mount
  useEffect(() => {
    if (getSettingsData?.data.aboutUs) {
      setContent(getSettingsData.data.aboutUs);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      if (!getSettingsData?.data) {
        console.log("add api hit");
        const response = await addSettings().unwrap();
        console.log("add response", response);
        toast.success("About Us added successfully!");
      } else {
        console.log("update api hit");
        const res = await updateSettings({ aboutUs: content }).unwrap();
        console.log("update res", res);
        toast.success("About Us updated successfully!");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to save aboutUs. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isAdding || isUpdating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading aboutUs..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading aboutUs. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-color py-1 px-8 ">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-secondary-color">
          About Us
        </h1>

        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          loading={isAdding || isUpdating}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default AboutUs;

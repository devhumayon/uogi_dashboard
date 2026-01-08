import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log(getSettingsData?.data);

  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load privacyPolicy data on component mount
  useEffect(() => {
    if (getSettingsData?.data.privacyPolicy) {
      setContent(getSettingsData.data.privacyPolicy);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      if (!getSettingsData?.data) {
        console.log("add api hit");
        const response = await addSettings().unwrap();
        console.log("add response", response);
        toast.success("Privacy Policy added successfully!");
      } else {
        console.log("update api hit");
        const res = await updateSettings({ privacyPolicy: content }).unwrap();
        console.log("update res", res);
        toast.success("Privacy Policy updated successfully!");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to save Privacy Policy. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isAdding || isUpdating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading privacyPolicy..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading privacyPolicy. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-color py-1 px-8 ">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-secondary-color">
          Privacy Policy
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
export default PrivacyPolicy;

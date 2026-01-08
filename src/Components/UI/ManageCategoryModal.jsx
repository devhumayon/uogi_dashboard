/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, ConfigProvider, Modal, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";

const ManageCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
  title = "Add Category",
  submitText = "Add Category",
  refetch,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageUrl = getImageUrl();

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setCategoryName(initialData.name || initialData.categoryName || "");
        setImagePreview(
          initialData?.image ? `/${initialData?.image}` : null
        );
        setCategoryImage(null); // Only reset image if adding new category
      } else {
        setCategoryName("");
        // Load image from localStorage if available
        const storedImage = localStorage.getItem("categoryImage");
        if (storedImage) {
          setImagePreview(storedImage);
        } else {
          setImagePreview(null);
        }
        setCategoryImage(null);
      }
    }
  }, [isOpen, initialData, imageUrl]);

  const handleImageChange = (info) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        console.log(previewUrl);
        setImagePreview(previewUrl);
        // Store the preview URL in localStorage
        localStorage.setItem("categoryImage", previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    // For add mode, image is required
    if (!initialData && !categoryImage) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    try {
      await onSubmit(formData);
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to update category");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    setCategoryImage(null);
    setImagePreview(null);
    // Clear the stored image preview when the modal is closed
    localStorage.removeItem("categoryImage");
    onClose();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#FEF2F5",
            headerBg: "#FEF2F5",
          },
          Input: {
            activeBorderColor: "rgb(254,51,114)",
            hoverBorderColor: "rgb(254,51,114)",
          },
        },
      }}
    >
      <Modal
        title={
          <span className="text-2xl font-bold text-secondary-color">
            {title}
          </span>
        }
        open={isOpen}
        onCancel={handleCancel}
        footer={[
          <ConfigProvider
            key="footer-config"
            theme={{
              components: {
                Button: {
                  defaultBg: "#FFFFFF",
                  defaultColor: "rgb(254,51,114)",
                  defaultBorderColor: "rgb(254,51,114)",
                  defaultHoverBg: "#FEF2F5",
                  defaultHoverColor: "rgb(254,51,114)",
                },
              },
            }}
          >
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
          </ConfigProvider>,
          <ConfigProvider
            key="submit-config"
            theme={{
              components: {
                Button: {
                  defaultBg: "rgb(254,51,114)",
                  defaultColor: "rgb(255,255,255)",
                  defaultHoverBg: "rgb(188,33,82)",
                  defaultHoverColor: "rgb(255,255,255)",
                  defaultHoverBorderColor: "rgb(255,255,255)",
                },
              },
            }}
          >
            <Button key="submit" onClick={handleSubmit} loading={isLoading}>
              {submitText}
            </Button>
          </ConfigProvider>,
        ]}
      >
        <div className="flex flex-col gap-4 py-4">
          <div>
            <label className="block mb-2 text-lg font-medium">
              Category Name
            </label>
            <Input
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              size="large"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">
              Category Image {initialData && "(Optional)"}
            </label>
            <Upload
              beforeUpload={() => false}
              onChange={handleImageChange}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                className="border-[#FE3372] text-[#FE3372] hover:bg-[#FEF2F5]"
              >
                {initialData ? "Upload New Image" : "Upload Image"}
              </Button>
            </Upload>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <label className="block mb-2 text-lg font-medium">Preview</label>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-[200px] object-cover rounded-md border border-[#FE3372]"
              />
            </div>
          )}
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default ManageCategoryModal;

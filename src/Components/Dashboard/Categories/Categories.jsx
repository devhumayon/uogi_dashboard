import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { getImageUrl } from "../../../utils/baseUrl";
import {
  useAllCategoryQuery,
  useAddCategoryMutation,
} from "../../../Redux/api/categoryApi";
import ManageCategoryModal from "../../UI/ManageCategoryModal";
import { toast } from "sonner";

const Categories = () => {
  const {
    data: allCategories,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useAllCategoryQuery();
  const categoriesData = allCategories?.data;
  console.log("categoriesData******", categoriesData);

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();

  const imageUrl = getImageUrl();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData) => {
    try {
      await addCategory(formData).unwrap();
      toast.success("Category added successfully!");
      handleCancel();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add category");
      console.error(error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded p-3">
        <div className="flex justify-between p-6">
          <div className="flex flex-col items-center justify-between w-full gap-5 md:flex-row">
            <h1 className="text-3xl font-bold text-secondary-color">
              All Categories
            </h1>
            <div>
              <ConfigProvider
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
                <Button
                  onClick={showModal}
                  size="large"
                  className="h-auto px-8 py-2 text-lg font-medium"
                >
                  Add Category
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="px-2 lg:px-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 2xl:grid-cols-5">
            {categoriesData?.map((category, index) => (
              <Link
                key={category?._id || index}
                to={`/category/${category?._id}`}
                className="hover:text-base-color"
              >
                <div className="flex flex-col gap-2 bg-[#FEF2F5] border border-[#FEF2F5] px-4 py-3 rounded-md">
                  <div className="relative rounded-md">
                    <img
                      src={`${category?.image}`}
                      alt="service"
                      className="w-full h-[180px] sm:h-[200px] object-cover rounded-md"
                    />
                    <div className="w-full bg-[#18191B88] h-full absolute top-0 left-0 flex items-end rounded-md">
                      <h1 className="text-[#FFEBF1] text-xl md:text-3xl p-3">
                        {category?.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ManageCategoryModal
        refetch={refetch}
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        isLoading={isAdding}
        title="Add New Category"
        submitText="Add Category"
      />
    </div>
  );
};

export default Categories;

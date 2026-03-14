import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ConfigProvider, Modal, Input, Popconfirm, Select } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getImageUrl } from "../../../utils/baseUrl";
import {
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetSubcategoriesQuery,
  useAddSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useAllCategoryQuery,
  useEditSubcategoryMutation,
  useMoveSubCategoryMutation,
} from "../../../Redux/api/categoryApi";
import ManageCategoryModal from "../../UI/ManageCategoryModal";
import { toast } from "sonner";
import { FiMove } from "react-icons/fi";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const { id: categoryId } = useParams();
  console.log(categoryId);

  const {
    data: allCategories,
    isLoading: isFetching,
    error: fetchError,
    refetch: refetchCategories,
  } = useAllCategoryQuery();
  const categoriesData = allCategories?.data;
  console.log("categoriesData", categoriesData);
  const imageUrl = getImageUrl();

  useEffect(() => {
    if (categoriesData && categoryId) {
      const foundCategory = categoriesData.find(
        (cat) => cat._id === categoryId
      );
      console.log("found category", foundCategory);
      if (foundCategory) {
        setCategoryData(foundCategory);
      }
    }
  }, [categoriesData, categoryId]);

  // API hooks
  const [editCategory, { isLoading: isEditing }] = useEditCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const {
    data: subcategoriesData,
    isLoading: isLoadingSubcategories,
    refetch: refetchSubcategories,
  } = useGetSubcategoriesQuery(categoryId);

  const [addSubcategory, { isLoading: isAddingSubcategory }] =
    useAddSubcategoryMutation();
  const [moveSubcategory, { isLoading: isMovingSubcategory }] =
    useMoveSubCategoryMutation();
  const [editSubcategory, { isLoading: isEditingSubcategory }] =
    useEditSubcategoryMutation();
  const [deleteSubcategory] = useDeleteSubcategoryMutation();

  const subcategories = subcategoriesData?.data || [];
  console.log(subcategories);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add Subcategory Modal States
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] =
    useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] =
    useState(false);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  // Edit Modal Handlers
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const moveCategoryModal = (subcategory) => {
    setNewSubcategoryName(subcategory); // Pre-fill the modal with current name
    setIsMoveModalOpen(true);    
  };

  const showEditSubcategoryModal = (subcategory) => {
    setCurrentSubcategory(subcategory);
    setNewSubcategoryName(subcategory.subCategoryname); // Pre-fill the modal with current name
    setIsEditSubcategoryModalOpen(true);
  };

  const handleMoveSubcategoryCancel = () => {
    setIsMoveModalOpen(false);
    setNewSubcategoryName(""); // Clear the input
  };

  const handleEditSubcategoryCancel = () => {
    setIsEditSubcategoryModalOpen(false);
    setNewSubcategoryName(""); // Clear the input
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async (formData) => {
    try {
      const response = await editCategory({
        id: categoryId || categoryData?._id,
        data: formData,
      }).unwrap();
      console.log(response);
      refetchCategories();

      toast.success("Category updated successfully!");
      handleEditCancel();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update category");
      console.error(error);
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId || categoryData?._id).unwrap();
      toast.success("Category deleted successfully!");
      navigate("/categories");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
      console.error(error);
    }
  };

  // Subcategory Modal Handlers
  const showSubcategoryModal = () => {
    setIsSubcategoryModalOpen(true);
  };

  const handleSubcategoryCancel = () => {
    setIsSubcategoryModalOpen(false);
    setSubcategoryName("");
  };

  const handleSubcategorySubmit = async () => {
    if (!subcategoryName.trim()) {
      toast.error("Please enter a subcategory name");
      return;
    }

    try {
      await addSubcategory({
        categoryId: categoryId,
        categoryName: categoryData.name,
        subCategoryname: subcategoryName,
      }).unwrap();

      toast.success("Subcategory added successfully!");
      handleSubcategoryCancel();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add subcategory");
      console.error(error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await deleteSubcategory({
        categoryId: categoryId || categoryData?._id,
        subcategoryId,
      }).unwrap();

      toast.success("Subcategory deleted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete subcategory");
      console.error(error);
    }
  };

  const handleEditSubcategorySubmit = async () => {
    if (!newSubcategoryName.trim()) {
      toast.error("Please enter a valid subcategory name");
      return;
    }

    const subcategoryId = currentSubcategory._id || currentSubcategory.id;

    try {
      const response = await editSubcategory({
        subcategoryId,
        data: { subCategoryname: newSubcategoryName },
      }).unwrap();

      console.log("edit sub", response);

      toast.success("Subcategory updated successfully!");
      refetchSubcategories();
      handleEditSubcategoryCancel(); // Close the modal
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update subcategory");
      console.error(error);
    }
  };


  const handleCategoryChange = (value) => {
  console.log("Selected Category ID:", value);
  setSelectedCategoryId(value);
};


  const handleMoveSubcategorySubmit = async (id) => {
    console.log('subcategory***', newSubcategoryName)
    console.log('selectedCategoryId***', selectedCategoryId)

    console.log('subcategoryId***', id)

    if (!selectedCategoryId) {
    toast.error("Please select a category");
    return;
  }

  const data = {
    subCategoryId: id,
    categoryId: selectedCategoryId
  }

    try {
      const response = await moveSubcategory(data).unwrap();

      console.log("move sub", response);

      toast.success("Subcategory move successfully!");
      refetchSubcategories();
      handleMoveSubcategoryCancel(); 
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update subcategory");
      console.error(error);
    }
  };

  if (
    isFetching ||
    !categoryData ||
    isEditingSubcategory ||
    isLoadingSubcategories
  ) {
    return <div>Loading...</div>;
  }
  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  return (
    <div className="min-h-[90vh] mx-auto p-8">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-semibold text-[#FE5C8E]">
          Category Details
        </h2>
        <div className="flex gap-3">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#FE5C8E",
                  defaultColor: "rgb(255,255,255)",
                  defaultHoverBg: "rgb(188,33,82)",
                  defaultHoverColor: "rgb(255,255,255)",
                },
              },
            }}
          >
            <Button
              icon={<EditOutlined />}
              onClick={showEditModal}
              size="large"
              className="px-6"
            >
              Edit Category
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#FE5C8E",
                  defaultBg: "#ff4d4f",
                  defaultColor: "rgb(255,255,255)",
                  defaultHoverBg: "#d9363e",
                  defaultHoverColor: "rgb(255,255,255)",
                },
              },
            }}
          >
            <Popconfirm
              title="Delete Category"
              description="Are you sure you want to delete this category?"
              onConfirm={handleDelete}
              placement="bottomLeft"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button
                icon={<DeleteOutlined />}
                size="large"
                className="px-6 bg-[#FE5C8E] text-[#FEF2F5]"
                loading={isDeleting}
              >
                Delete
              </Button>
            </Popconfirm>
          </ConfigProvider>
        </div>
      </div>

      <div className="w-full sm:w-[80%] lg:w-[70%] xl:w-[60%]">
        {/* Image Section */}
        <div className="mb-6 flex justify-center">
          <img
            src={`${categoryData?.image}`}
            alt={categoryData?.name || categoryData?.categoryName}
            className="h-[300px] w-[350px] rounded-3xl object-contain bg-white bottom-2 border border-gray-200"
          />
        </div>

        {/* Service Info Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-3xl font-semibold">
            {categoryData?.name || categoryData?.categoryName}
          </h3>
        </div>

        {/* Subcategories Section */}
        <div className="bg-[#FEF2F5] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-2xl font-semibold">Subcategories</h4>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultBg: "#FE5C8E",
                    defaultColor: "rgb(255,255,255)",
                    defaultHoverBg: "rgb(188,33,82)",
                    defaultHoverColor: "rgb(255,255,255)",
                  },
                },
              }}
            >
              <Button
                icon={<PlusOutlined />}
                onClick={showSubcategoryModal}
                size="large"
                className="px-6"
              >
                Add Subcategory
              </Button>
            </ConfigProvider>
          </div>

          {isLoadingSubcategories ? (
            <div className="py-8 text-center text-gray-500">
              Loading subcategories...
            </div>
          ) : subcategories.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {subcategories.map((item) => (
                <div
                  key={item._id || item.id}
                  className="grid grid-cols-3 px-4 py-3 bg-white rounded-md"
                >
                  <div className="text-lg font-medium col-span-2 ">
                    {item.subCategoryname}
                  </div>

                  <div>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => showEditSubcategoryModal(item)} // Show the modal when editing
                    >
                      Edit
                    </Button>

                    <Popconfirm
                      title="Delete Subcategory"
                      description="Are you sure you want to delete this subcategory?"
                      onConfirm={() =>
                        handleDeleteSubcategory(item._id || item.id)
                      }
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ danger: true }}
                    >
                      <Button type="text" danger icon={<DeleteOutlined />}>
                        Delete
                      </Button>
                    </Popconfirm>
                     <Button
                      type="text"
                      icon={<FiMove />}
                      onClick={() => moveCategoryModal(item)} // Show the modal when editing
                    >
                      Move
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No subcategories yet. Click &quot;Add Subcategory&quot; to create
              one.
            </div>
          )}
        </div>
      </div>

      {/* Edit Category Modal */}
      <ManageCategoryModal
        isOpen={isEditModalOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        isLoading={isEditing}
        initialData={categoryData}
        title="Edit Category"
        submitText="Update Category"
        imageFieldName="image"
      />

      {/* Add Subcategory Modal */}
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
              Add Subcategory
            </span>
          }
          open={isSubcategoryModalOpen}
          onCancel={handleSubcategoryCancel}
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
              <Button key="back" onClick={handleSubcategoryCancel}>
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
                  },
                },
              }}
            >
              <Button
                key="submit"
                onClick={handleSubcategorySubmit}
                loading={isAddingSubcategory}
              >
                Add Subcategory
              </Button>
            </ConfigProvider>,
          ]}
        >
          <div className="py-4">
            <label className="block mb-2 text-lg font-medium">
              Subcategory Name
            </label>
            <Input
              placeholder="Enter subcategory name"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              size="large"
            />
          </div>
        </Modal>
      </ConfigProvider>

      {/* Edit Subcategory Modal */}
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
          title="Edit Subcategory"
          open={isEditSubcategoryModalOpen}
          onCancel={handleEditSubcategoryCancel}
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
              <Button key="cancel" onClick={handleEditSubcategoryCancel}>
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
                  },
                },
              }}
            >
              <Button
                key="submit"
                type="primary"
                onClick={handleEditSubcategorySubmit}
                loading={isEditingSubcategory}
              >
                Save Changes
              </Button>
            </ConfigProvider>,
          ]}
        >
          <Input
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            placeholder="Enter new subcategory name"
          />
        </Modal>
      </ConfigProvider>

      {/* move model  */}
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
          title="Move Subcategory"
          open={isMoveModalOpen}
          onCancel={handleMoveSubcategoryCancel}
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
              <Button key="cancel" onClick={handleMoveSubcategoryCancel}>
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
                  },
                },
              }}
            >
              <Button
                key="submit"
                type="primary"
                onClick={() => handleMoveSubcategorySubmit(newSubcategoryName?._id)}
                // loading={isEditingSubcategory}
              >
                Moved
              </Button>
            </ConfigProvider>,
          ]}
        >
          
          <p className="mb-4"><span className="font-semibold" >SubCategory :</span> {newSubcategoryName?.subCategoryname || "N/A"}</p>

          <div>
            <p><span className="font-semibold">Selected Category</span></p>
            <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a category"
            optionFilterProp="children"
            onChange={handleCategoryChange}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {categoriesData?.map((category) => (
              <Select.Option key={category?._id}  value={category?._id}>
                {category?.name}
              </Select.Option>
            ))}
          </Select>
          </div>
         
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default CategoryDetails;

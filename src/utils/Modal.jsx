import { Modal } from "antd";
const JustModal = ({ title, showModal, setShowModal, children, width }) => {
  const handleCloseModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Modal
      width={width}
      title={title}
      open={showModal}
      onCancel={handleCloseModal}
      okButtonProps={{ style: { visibility: "hidden" } }}
      cancelButtonProps={{ style: { visibility: "hidden" } }}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default JustModal;

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, id }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-4 z-10">
        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this topic?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

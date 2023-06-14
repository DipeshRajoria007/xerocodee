import { useState } from "react";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    const keywordsArray = keywords.split(",").map((keyword) => keyword.trim());

    onSave({
      topic,
      keywords: keywordsArray,
      category,
    });

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg w-[50%] p-4 z-10">
        <h2 className="text-lg font-semibold mb-2">Add Topic</h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="topic-input"
          >
            Topic:
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="topic-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="keywords-input"
          >
            Keywords:
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            id="keywords-input"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="category-input"
          >
            Category:
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 appearance-none focus:outline-none focus:border-blue-500"
            id="category-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Custom">Custom</option>
            <option value="Mission">Mission</option>
            <option value="ICP">ICP</option>
            <option value="Product">Product</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
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

export default Modal;

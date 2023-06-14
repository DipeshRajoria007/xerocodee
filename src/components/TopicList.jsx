import { useEffect } from "react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { AiTwotoneDelete } from "react-icons/ai";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { FaExclamationTriangle, FaRegFrown } from "react-icons/fa";
const tabs = [
  { id: 0, label: "All", content: "All" },
  { id: 1, label: "Custom", content: "Custom" },
  { id: 2, label: "Mission", content: "Mission" },
  { id: 3, label: "ICP", content: "ICP" },
  { id: 4, label: "Product", content: "Product" },
];
const highlightColor = [
  "bg-red-200",
  "bg-yellow-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-alpha-200",
];
const textColor = [
  "text-red-600",
  "text-yellow-600",
  "text-green-600",
  "text-blue-600",
  "text-alpha-600",
];
const borderColor = [
  "border-red-600",
  "border-yellow-600",
  "border-green-600",
  "border-blue-600",
  "border-alpha-600",
];

const TopicList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    "todos",
    async () => {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/648a2ef78e4aa6225eae78cb"
      );
      const data = await response.json();
      return data.record;
    },
    {
      initialData: queryClient.getQueryData("topics"), // Load data from cache initially
      onSuccess: (data) => {
        queryClient.setQueryData("topics", data); // Cache the fetched data
      },
    }
  );

  // useStates
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [allData, setAllData] = useState(data?.data || []);
  const [tabItem, setTabItem] = useState(allData);
  const [id, setId] = useState("");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // useEffects

  useEffect(() => {
    setAllData(data?.data);
  }, [data]);

  useEffect(() => {
    console.log(activeTab);
    if (activeTab === 0) setTabItem(allData);
    else {
      const arr = allData?.filter(
        (data) => data.category === tabs[activeTab].label
      );
      console.log({ arr });
      setTabItem(arr);
    }
  }, [activeTab, allData]);

  //click handler

  const handleAddTopic = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveTopic = (props) => {
    setAllData([...allData, props]);
  };

  const handleDelete = (id) => {
    console.log(id);
    setId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Handle delete logic
    const arr = allData.filter((item) => item.id !== id);
    setAllData(arr);
    setIsDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <div className=" p-2 m-8 ">
      <header className="mb-4">Category</header>
      <div className="flex justify-between mb-4">
        <div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`py-2 px-4 text-bold border-red-500 mr-4 ${
                activeTab === tab.id
                  ? "border-b-4 text-red-500"
                  : " text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleAddTopic}
        >
          Add Topic
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTopic}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          id={id}
        />
      </div>
      <div className="">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="flex flex-col items-center">
            <FaExclamationTriangle className="text-5xl text-red-500 mb-2" />
            <p className="text-red-500 text-center">
              Error occurred while fetching topics.
            </p>
          </div>
        ) : tabItem?.length === 0 ? (
          <div className="flex flex-col items-center mt-24">
            <FaRegFrown className="text-5xl text-gray-800 mb-2" />
            <p className="text-gray-800 text-center">No topics found.</p>
          </div>
        ) : (
          <table className="w-full table-auto border-collapse	 border border-slate-200 p-4">
            <thead className="">
              <tr className="bg-gray-200">
                <th className="p-4 w-full">Recommended Topics</th>
              </tr>
            </thead>
            <tbody>
              {tabItem?.map((topic, idx) => (
                <tr key={idx} className="p-4">
                  <td className="p-4 flex justify-between">
                    <div>
                      {topic.topic}
                      <p className="mt-2">
                        {topic.keywords.map((keyword, idx) => (
                          <span
                            className={`${highlightColor[idx % 5]} ${
                              textColor[idx % 5]
                            } ${
                              borderColor[idx % 5]
                            } border-[1.5px] rounded-lg mr-1 px-2 py-1`}
                            key={idx}
                          >
                            {keyword}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-blue-500 align-middle hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        write
                      </button>
                      <button
                        onClick={() => handleDelete(topic.id)}
                        className="bg-red-500 align-middle hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                      >
                        <AiTwotoneDelete className="text-2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TopicList;

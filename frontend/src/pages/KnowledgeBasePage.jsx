import React, { useState } from "react";
import KnowledgeBaseModal from "../components/KnowledgeBaseModal";

const KnowledgeBasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [knowledgeBases, setKnowledgeBases] = useState([]); // Tracks knowledge bases

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addKnowledgeBase = (knowledgeBaseName) => {
    setKnowledgeBases([...knowledgeBases, { name: knowledgeBaseName }]); // Add new knowledge base
    closeModal();
  };

  return (
    <div className="flex h-full gap-2">
      {/* Left Section */}
      <div className="w-1/4 bg-white p-4 rounded-sm">
        <div className="flex justify-between items-center border-b pb-4 border-gray-300">
          <h1 className="text-lg font-bold">Knowledge Base</h1>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-4 flex items-center justify-center bg-white rounded-sm">
        {knowledgeBases.length === 0 ? (
          // No knowledge bases available
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-4">📄</div>
            <p>You don't have any knowledge base</p>
          </div>
        ) : (
          // Display available knowledge bases
          <div className="w-full max-w-4xl">
            <ul className="divide-y divide-gray-300">
              {knowledgeBases.map((kb, index) => (
                <li
                  key={index}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="text-lg font-medium">{kb.name}</div>
                  <button className="text-sm text-red-500 hover:underline">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <KnowledgeBaseModal
          closeModal={closeModal}
          addKnowledgeBase={addKnowledgeBase}
        />
      )}
    </div>
  );
};

export default KnowledgeBasePage;
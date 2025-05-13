import React, { useState } from "react";

const KnowledgeBaseModal = ({ closeModal, addKnowledgeBase }) => {
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("");

  const handleSave = () => {
    if (!knowledgeBaseName) {
      alert("Please enter a Knowledge Base Name.");
      return;
    }
    addKnowledgeBase(knowledgeBaseName); // Pass the knowledge base name to parent
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
        <h2 className="text-lg font-bold mb-4">Add Knowledge Base</h2>

        {/* Knowledge Base Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Knowledge Base Name</label>
          <input
            type="text"
            placeholder="Enter"
            value={knowledgeBaseName}
            onChange={(e) => setKnowledgeBaseName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseModal;
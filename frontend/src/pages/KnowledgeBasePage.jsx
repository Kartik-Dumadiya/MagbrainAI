import React, { useState } from "react";
import KnowledgeBaseModal from "../components/KnowledgeBaseModal";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt, FaLink, FaFilePowerpoint, FaFileCsv, FaTrash } from "react-icons/fa";

const fileIcons = {
  pdf: <FaFilePdf className="text-red-500" />,
  doc: <FaFileWord className="text-blue-500" />,
  docx: <FaFileWord className="text-blue-500" />,
  xls: <FaFileExcel className="text-green-600" />,
  xlsx: <FaFileExcel className="text-green-600" />,
  csv: <FaFileCsv className="text-green-700" />,
  ppt: <FaFilePowerpoint className="text-orange-500" />,
  pptx: <FaFilePowerpoint className="text-orange-500" />,
  md: <FaFileAlt className="text-gray-700" />,
  txt: <FaFileAlt className="text-gray-700" />,
  html: <FaFileAlt className="text-purple-700" />,
  default: <FaFileAlt className="text-gray-400" />,
};

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  return fileIcons[ext] || fileIcons.default;
};

const KnowledgeBasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [knowledgeBases, setKnowledgeBases] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addKnowledgeBase = (data) => {
    setKnowledgeBases([...knowledgeBases, data]);
    closeModal();
  };

  const handleDeleteKB = (idx) => {
    if (window.confirm("Delete this Knowledge Base?")) {
      setKnowledgeBases(knowledgeBases.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="flex h-full gap-2">
      {/* Sidebar */}
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

      {/* Main content */}
      <div className="flex-1 p-4 flex flex-col items-center bg-white rounded-sm">
        {knowledgeBases.length === 0 ? (
          <div className="text-center text-gray-500 flex-1 flex flex-col justify-center">
            <div className="text-4xl mb-4">📄</div>
            <p>You don't have any knowledge base</p>
          </div>
        ) : (
          <div className="w-full max-w-3xl mt-2">
            <ul className="divide-y divide-gray-200">
              {knowledgeBases.map((kb, idx) => (
                <li key={idx} className="py-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg font-bold mb-1">{kb.name}</div>
                      {/* Display files */}
                      {kb.files && kb.files.length > 0 && (
                        <div className="mb-2">
                          <div className="font-semibold text-sm mb-1">Files:</div>
                          <ul className="flex flex-wrap gap-2">
                            {kb.files.map((file, i) => (
                              <li key={i} className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1 border border-gray-200 text-sm">
                                <span>{getFileIcon(file.name)}</span>
                                <span title={file.name} className="truncate max-w-xs">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Display website URL */}
                      {kb.websiteURL && (
                        <div className="mb-2">
                          <span className="font-semibold text-sm">Website: </span>
                          <a
                            href={kb.websiteURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-all"
                          >
                            {kb.websiteURL}
                          </a>
                        </div>
                      )}
                      {/* Display plain text */}
                      {kb.plainText && (
                        <div className="mb-2">
                          <span className="font-semibold text-sm">Text:</span>
                          <div className="bg-gray-100 rounded p-2 text-gray-700 text-sm whitespace-pre-wrap mt-1">{kb.plainText}</div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteKB(idx)}
                      className="text-red-500 hover:text-red-700 ml-4"
                      title="Delete Knowledge Base"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
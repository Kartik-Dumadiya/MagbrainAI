import React, { useState } from "react";
import KnowledgeBaseModal from "../components/KnowledgeBaseModal";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaLink,
  FaFilePowerpoint,
  FaFileCsv,
  FaTrash,
  FaPlusCircle,
} from "react-icons/fa";

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
    <div
      className="flex h-screen gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300 overflow-hidden"
      style={{ minHeight: "100vh", height: "100dvh", maxHeight: "100dvh" }}
    >
      {/* Sidebar */}
      <div className="w-1/4 min-w-[260px] max-w-[340px] bg-white/70 p-6 rounded-2xl shadow-xl border border-blue-100 flex flex-col">
        <div className="flex justify-between items-center border-b pb-4 border-gray-200">
          <h1 className="text-xl font-extrabold text-blue-800 tracking-tight flex items-center gap-2">
            <span className="text-blue-400 animate-pulse">●</span>
            Knowledge Base
          </h1>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow active:scale-95"
          >
            <FaPlusCircle className="mb-0.5" /> Add
          </button>
        </div>
        <div className="mt-4 text-gray-600 text-sm">
          Create, organize, and manage your knowledge sources—upload files, add website links, or text notes!
        </div>
      </div>

      {/* Main content */}
      <div
        className="flex-1 p-6 flex flex-col items-center bg-white/80 rounded-2xl border border-blue-100 shadow-xl min-h-0"
        style={{ overflow: "hidden", maxHeight: "100%" }}
      >
        {knowledgeBases.length === 0 ? (
          <div className="text-center text-gray-500 flex-1 flex flex-col justify-center items-center">
            <div className="text-6xl mb-4 animate-bounce">📄</div>
            <p className="text-lg font-semibold mb-1">
              You don't have any knowledge base
            </p>
            <p className="text-sm">
              Click <span className="text-blue-600 font-bold">Add</span> to create one!
            </p>
          </div>
        ) : (
          <div className="w-full max-w-3xl mt-2 flex-1 overflow-y-auto pr-2" style={{ maxHeight: "calc(100dvh - 60px)" }}>
            <ul className="divide-y divide-blue-100">
              {knowledgeBases.map((kb, idx) => (
                <li key={idx} className="py-7 hover:bg-indigo-50/40 rounded-xl px-4 transition group">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-bold mb-1 text-blue-700 flex items-center gap-2">
                        <FaFileAlt className="text-blue-400" />
                        <span className="truncate" title={kb.name}>{kb.name}</span>
                      </div>
                      {/* Display files */}
                      {kb.files && kb.files.length > 0 && (
                        <div className="mb-2">
                          <div className="font-semibold text-xs mb-1 text-blue-500">Files:</div>
                          <ul className="flex flex-wrap gap-2">
                            {kb.files.map((file, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-1 bg-blue-50/80 rounded px-2 py-1 border border-blue-100 text-xs text-gray-700 max-w-[130px] truncate"
                                title={file.name}
                              >
                                <span>{getFileIcon(file.name)}</span>
                                <span className="truncate">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Display website URL */}
                      {kb.websiteURL && (
                        <div className="mb-2">
                          <span className="font-semibold text-xs text-blue-500">Website: </span>
                          <a
                            href={kb.websiteURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline break-all text-xs font-medium"
                          >
                            {kb.websiteURL}
                          </a>
                        </div>
                      )}
                      {/* Display plain text */}
                      {kb.plainText && (
                        <div className="mb-2">
                          <span className="font-semibold text-xs text-blue-500">Text:</span>
                          <div className="bg-blue-50 rounded-lg p-2 text-gray-700 text-xs whitespace-pre-wrap mt-1 border border-blue-100">{kb.plainText}</div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteKB(idx)}
                      className="text-red-500 hover:text-red-700 ml-2 p-2 rounded-full hover:bg-red-50 transition"
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
      {/* Custom Animation Styles */}
      <style>{`
        html, body, #root {
          height: 100%;
          overflow: hidden !important;
        }
        .animate-bounce {
          animation: bounce 1.3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
      `}</style>
    </div>
  );
};

export default KnowledgeBasePage;
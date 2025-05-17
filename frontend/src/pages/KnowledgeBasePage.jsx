import React, { useState, useRef } from "react";
import KnowledgeBaseModal from "../components/KnowledgeBaseModal";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaFilePowerpoint,
  FaFileCsv,
  FaTrash,
  FaPlusCircle,
  FaChevronRight,
  FaBookOpen,
  FaDatabase
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

const accentColors = [
  "from-blue-200 to-blue-50",
  "from-pink-100 to-pink-50",
  "from-green-100 to-green-50",
  "from-yellow-100 to-yellow-50",
  "from-indigo-100 to-indigo-50",
  "from-cyan-100 to-cyan-50",
  "from-purple-100 to-purple-50",
  "from-orange-100 to-orange-50"
];

const KnowledgeBasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const entryRefs = useRef([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addKnowledgeBase = (data) => {
    setKnowledgeBases([...knowledgeBases, data]);
    closeModal();
    setTimeout(() => {
      setActiveIdx(null); // Do not auto-select after add
    }, 350);
  };

  const handleDeleteKB = (idx) => {
    if (window.confirm("Delete this Knowledge Base?")) {
      setKnowledgeBases(knowledgeBases.filter((_, i) => i !== idx));
      if (activeIdx === idx) setActiveIdx(null);
      // If deleting an entry before the selected one, shift selection index back by one
      if (activeIdx !== null && idx < activeIdx) setActiveIdx(activeIdx - 1);
    }
  };

  // Toggle select/unselect with click
  const handleSidebarNav = (idx) => {
    if (activeIdx === idx) {
      setActiveIdx(null);
    } else {
      setActiveIdx(idx);
      setTimeout(() => {
        if (entryRefs.current[idx]) {
          entryRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0);
    }
  };

  return (
    <div
      className="flex h-screen gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 transition-colors duration-300 overflow-hidden"
      style={{ minHeight: "100vh", height: "100dvh", maxHeight: "100dvh" }}
    >
      {/* Sidebar */}
      <div className="w-1/4 min-w-[260px] max-w-[340px] bg-gradient-to-b from-white/95 to-blue-100/60 p-6 rounded-2xl shadow-xl border border-blue-100 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center border-b pb-4 border-gray-200">
          <h1 className="text-xl font-extrabold text-blue-800 tracking-tight flex items-center gap-2">
            <FaBookOpen className="text-blue-400" />
            Knowledge Base
          </h1>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow active:scale-95"
          >
            <FaPlusCircle className="mb-0.5" /> Add
          </button>
        </div>
        {/* Sidebar KB Entries */}
        <div className="mt-4 flex-1 overflow-y-auto">
          {knowledgeBases.length === 0 ? (
            <div className="text-gray-400 text-sm mt-8 flex items-center gap-1 pl-2">
              <FaDatabase /> No entries yet
            </div>
          ) : (
            <ul className="space-y-1">
              {knowledgeBases.map((kb, idx) => (
                <li key={kb.name + idx}>
                  <button
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left font-medium transition
                      ${
                        activeIdx === idx
                          ? "bg-blue-600/90 text-white shadow-lg ring-2 ring-blue-300"
                          : "hover:bg-blue-100/60 text-blue-800"
                      }
                    `}
                    onClick={() => handleSidebarNav(idx)}
                    title={kb.name}
                  >
                    <FaChevronRight
                      className={`transition-transform ${
                        activeIdx === idx ? "rotate-90 text-white" : "text-blue-300"
                      }`}
                    />
                    <span className="truncate">{kb.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4 text-gray-600 text-xs leading-relaxed border-t pt-3 border-blue-100">
          <span className="font-semibold text-blue-800">Tip:</span> Click a knowledge base to quickly jump to its details. Click again to unfocus.
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
          <div className="w-full max-w-5xl flex-1 overflow-y-auto p-3 space-y-3" style={{ maxHeight: "calc(100dvh - 60px)" }}>
            {knowledgeBases.map((kb, idx) => (
              <section
                key={kb.name + idx}
                ref={el => (entryRefs.current[idx] = el)}
                className={`relative group transition-all duration-300 ${
                  activeIdx === idx
                    ? "z-10"
                    : ""
                }`}
                tabIndex={0}
              >
                <div className={`
                  rounded-xl border shadow-md p-6 transition-all duration-300
                  bg-gradient-to-tr ${accentColors[idx % accentColors.length]}
                  ${activeIdx === idx
                    ? "border-blue-700 ring-4 ring-blue-300/30 scale-[1.01] shadow-2xl"
                    : "border-blue-100/80"
                  }
                  hover:ring-2 hover:ring-blue-200/70
                `}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-bold mb-1 text-blue-900 flex items-center gap-2">
                        <span className="inline-block rounded-full bg-white/80 p-2 shadow text-blue-400 border border-blue-100">
                          <FaFileAlt />
                        </span>
                        <span className="truncate" title={kb.name}>{kb.name}</span>
                      </div>
                      {/* Display files */}
                      {kb.files && kb.files.length > 0 && (
                        <div className="mb-2">
                          <div className="font-semibold text-xs mb-1 text-blue-700">Files:</div>
                          <ul className="flex flex-wrap gap-2">
                            {kb.files.map((file, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-1 bg-white/80 rounded px-2 py-1 border border-blue-200 text-xs text-gray-800 max-w-[140px] truncate shadow-sm"
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
                          <span className="font-semibold text-xs text-blue-700">Website: </span>
                          <a
                            href={kb.websiteURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-900 underline break-all text-xs font-medium"
                          >
                            {kb.websiteURL}
                          </a>
                        </div>
                      )}
                      {/* Display plain text */}
                      {kb.plainText && (
                        <div className="mb-2">
                          <span className="font-semibold text-xs text-blue-700">Text:</span>
                          <div className="bg-white/80 rounded-lg p-2 text-gray-800 text-xs whitespace-pre-wrap mt-1 border border-blue-200 shadow-sm">
                            {kb.plainText}
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteKB(idx)}
                      className="text-red-500 hover:text-red-700 ml-2 p-2 rounded-full hover:bg-red-100/80 transition"
                      title="Delete Knowledge Base"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </section>
            ))}
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
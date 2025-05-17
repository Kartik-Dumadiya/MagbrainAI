/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaFilePowerpoint,
  FaFileCsv,
  FaFile,
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
  default: <FaFile className="text-gray-400" />,
};

const allowedExtensions = [
  "pdf", "doc", "docx", "xls", "xlsx", "csv", "ppt", "pptx", "md", "txt", "html"
];

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  return fileIcons[ext] || fileIcons.default;
};

const modalBackdropVariants = {
  hidden: { opacity: 0, filter: "blur(0px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.18 } },
  exit: { opacity: 0, filter: "blur(0px)", transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 22, duration: 0.3 },
  },
  exit: {
    y: 60,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const KnowledgeBaseModal = ({ closeModal, addKnowledgeBase }) => {
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("");
  const [files, setFiles] = useState([]);
  const [websiteURL, setWebsiteURL] = useState("");
  const [plainText, setPlainText] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Filter allowed extensions only
    const validFiles = selectedFiles.filter(file => {
      const ext = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(ext);
    });
    setFiles([...files, ...validFiles]);
    e.target.value = ""; // Reset input for same-file upload
  };

  // Remove selected file
  const handleRemoveFile = (idx) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  // Validate URL
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Save knowledge base entry
  const handleSave = () => {
    setError("");
    if (!knowledgeBaseName.trim()) {
      setError("Please enter a Knowledge Base Name.");
      return;
    }
    if (files.length === 0 && !websiteURL.trim() && !plainText.trim()) {
      setError("Please upload a file, enter a URL, or add some text.");
      return;
    }
    if (websiteURL.trim() && !isValidURL(websiteURL.trim())) {
      setError("Please enter a valid URL.");
      return;
    }

    addKnowledgeBase({
      name: knowledgeBaseName.trim(),
      files,
      websiteURL: websiteURL.trim(),
      plainText: plainText.trim(),
    });
    setKnowledgeBaseName(""); setFiles([]); setWebsiteURL(""); setPlainText("");
    setError("");
  };

  // Close modal on ESC key
  React.useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [closeModal]);

  // State for animate-out
  const [show, setShow] = useState(true);
  const handleCloseModal = () => {
    setShow(false);
    setTimeout(() => closeModal(), 250); // match exit duration
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalBackdropVariants}
          style={{
            background: "rgba(230, 235, 255, 0.58)",
            backdropFilter: "blur(9px) saturate(1.5)",
            WebkitBackdropFilter: "blur(9px) saturate(1.5)",
          }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-blue-100"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-xl font-bold transition-all z-10 focus:outline-none"
              aria-label="Close"
              tabIndex={0}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-5 text-blue-800 animate-fade-in-down">Add Knowledge Base</h2>
            {error && (
              <div className="mb-3 px-3 py-2 rounded-md bg-red-50 text-red-700 border border-red-200 animate-shake">
                {error}
              </div>
            )}
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-blue-800">
                Knowledge Base Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter"
                value={knowledgeBaseName}
                onChange={(e) => setKnowledgeBaseName(e.target.value)}
                className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-[2.5px] focus:ring-blue-300 transition-all"
              />
            </div>
            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-blue-800">Upload Files</label>
              <input
                ref={fileInputRef}
                multiple
                type="file"
                accept={allowedExtensions.map(ext => "." + ext).join(",")}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 font-medium transition"
              >
                Choose Files
              </button>
              <div className="mt-2 space-y-1">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm bg-blue-50/40 rounded px-2 py-1 border border-blue-100">
                    <span>{getFileIcon(file.name)}</span>
                    <span className="truncate max-w-[130px]" title={file.name}>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="ml-2 text-red-500 hover:underline"
                      aria-label="Remove file"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Allowed: pdf, doc, docx, xls, xlsx, csv, ppt, pptx, md, txt, html
              </div>
            </div>
            {/* Website URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-blue-800">Website URL</label>
              <input
                type="text"
                placeholder="https://example.com"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
                className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-[2.5px] focus:ring-blue-300 transition-all"
              />
            </div>
            {/* Plain Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-blue-800">Text Input</label>
              <textarea
                rows={3}
                placeholder="Paste or enter text here..."
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-[2.5px] focus:ring-blue-300 transition-all"
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-all shadow"
              >
                Save
              </button>
            </div>
            {/* Animations */}
            <style>{`
              .animate-fade-in-down {
                animation: fadeInDown 0.5s;
              }
              .animate-shake {
                animation: shake 0.3s;
              }
              @keyframes fadeInDown {
                from { opacity: 0; transform: translateY(-18px);}
                to { opacity: 1; transform: translateY(0);}
              }
              @keyframes shake {
                0% { transform: translateX(0);}
                20% { transform: translateX(-6px);}
                40% { transform: translateX(6px);}
                60% { transform: translateX(-4px);}
                80% { transform: translateX(4px);}
                100% { transform: translateX(0);}
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KnowledgeBaseModal;
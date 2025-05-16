import React, { useState, useRef } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt, FaLink, FaFilePowerpoint, FaFileCsv, FaFile } from "react-icons/fa";

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

const KnowledgeBaseModal = ({ closeModal, addKnowledgeBase }) => {
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("");
  const [files, setFiles] = useState([]);
  const [websiteURL, setWebsiteURL] = useState("");
  const [plainText, setPlainText] = useState("");
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
    if (!knowledgeBaseName.trim()) {
      alert("Please enter a Knowledge Base Name.");
      return;
    }
    if (files.length === 0 && !websiteURL.trim() && !plainText.trim()) {
      alert("Please upload a file, enter a URL, or add some text.");
      return;
    }
    if (websiteURL.trim() && !isValidURL(websiteURL.trim())) {
      alert("Please enter a valid URL.");
      return;
    }

    addKnowledgeBase({
      name: knowledgeBaseName.trim(),
      files,
      websiteURL: websiteURL.trim(),
      plainText: plainText.trim(),
    });
    // Clear modal state after save (optional)
    setKnowledgeBaseName(""); setFiles([]); setWebsiteURL(""); setPlainText("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-lg font-bold mb-4">Add Knowledge Base</h2>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Knowledge Base Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Enter"
            value={knowledgeBaseName}
            onChange={(e) => setKnowledgeBaseName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload Files</label>
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
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
          >
            Choose Files
          </button>
          <div className="mt-2 space-y-1">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span>{getFileIcon(file.name)}</span>
                <span className="truncate max-w-xs" title={file.name}>{file.name}</span>
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
          <label className="block text-sm font-medium mb-1">Website URL</label>
          <input
            type="text"
            placeholder="https://example.com"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {/* Plain Text */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Text Input</label>
          <textarea
            rows={3}
            placeholder="Paste or enter text here..."
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
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
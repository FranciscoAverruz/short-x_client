/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "@atoms/Button";

const UrlList = ({ urls, setUrls, pagination, setPagination }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editUrl, setEditUrl] = useState("");

  const itemsPerPage = 5; 

  const totalPages = Math.ceil(pagination.totalUrls / itemsPerPage);
  const currentPage = pagination.currentPage;

  const handleAddUrl = () => {
    setUrls([...urls, editUrl]);
    setEditUrl("");
    setIsEditing(false);
  };

  const handleDeleteUrl = (urlToDelete) => {
    setUrls(urls.filter((url) => url !== urlToDelete));
  };

  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  const currentUrls = urls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">My URLs</h2>
      <ul className="space-y-2">
        {currentUrls.map((url, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{url}</span>
            {isEditing && (
              <button
                className="text-red-500"
                onClick={() => handleDeleteUrl(url)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          label="Previous"
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        />
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          label="Next"
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        />
      </div>

      {/* URL modification */}
      {isEditing ? (
        <div className="flex space-x-4">
          <input
            type="text"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
            className="border p-2 rounded"
            placeholder="Add new URL"
          />
          <Button label="Save" variant="primary" onClick={handleAddUrl} />
          <Button
            label="Cancel"
            variant="secondary"
            onClick={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <Button label="Edit" variant="primary" onClick={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default UrlList;

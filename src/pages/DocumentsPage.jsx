import React from "react";
import RecentDocuments from "../components/RecentDocuments";

const DocumentsPage = () => {
  return (
    <div className="flex flex-col w-[95%] max-w-[1092px] mx-auto">
      <p className="text-3xl font-bold mb-8">This where you can view recent documents.</p>
      <RecentDocuments />
    </div>
  );
};

export default DocumentsPage;
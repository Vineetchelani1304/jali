// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
// import PropTypes from "prop-types";

// function CreateProjectCard({
//   projectId,
//   title,
//   description,
//   date,
//   roles = [],
//   issues,
//   onDelete,
// }) {
//   const [projectData, setProjectData] = useState(null);
//   const [isEditingTitle, setIsEditingTitle] = useState(false); // State to toggle edit mode
//   const [newTitle, setNewTitle] = useState(title); // State to hold the new title
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
//     const foundProject = storedProjects.find(
//       (project) => project.id === projectId
//     );
//     setProjectData(foundProject);
//   }, [projectId]);

//   const handleEditTitle = () => {
//     setIsEditingTitle(true); // Enable editing mode
//   };

//   const handleSaveTitle = () => {
//     const updatedProjects = JSON.parse(localStorage.getItem("projects")) || [];
//     const updatedProject = updatedProjects.map((project) => {
//       if (project.id === projectId) {
//         return { ...project, title: newTitle }; // Update the title
//       }
//       return project;
//     });

//     localStorage.setItem("projects", JSON.stringify(updatedProject)); // Save updated project to localStorage
//     setProjectData({ ...projectData, title: newTitle }); // Update component state
//     setIsEditingTitle(false); // Exit editing mode
//   };

//   const handleDeleteProject = () => {
//     onDelete(projectId);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-[400px] mx-auto mb-4">
//       <div className="flex justify-between items-center">
//         {isEditingTitle ? (
//           // Render an input field when editing
//           <input
//             type="text"
//             className="border px-2 py-1 text-lg font-semibold text-gray-800 rounded"
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             onBlur={handleSaveTitle} // Save on blur (when user clicks outside the input)
//             onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()} // Save when Enter is pressed
//           />
//         ) : (
//           // Render the title normally
//           <h2 className="text-lg font-semibold text-gray-800">
//             {newTitle || projectData?.title || "No Title Available"}
//           </h2>
//         )}
//         <div className="flex items-center space-x-2">
//           {isEditingTitle ? (
//             <button
//               onClick={handleSaveTitle}
//               className="text-green-500 text-sm hover:underline"
//             >
//               <FaSave className="inline-block" />
//             </button>
//           ) : (
//             <button
//               onClick={handleEditTitle}
//               className="text-blue-500 text-sm hover:underline"
//             >
//               <FaEdit className="inline-block" />
//             </button>
//           )}
//           <button
//             onClick={handleDeleteProject}
//             className="text-red-500 text-sm hover:underline"
//           >
//             <FaTrash className="inline-block" />
//           </button>
//         </div>
//       </div>

//       <hr className="my-2 border-t border-gray-300" />

//       <p className="text-sm text-gray-600 mt-2">
//         {description || projectData?.description || "No description provided"}
//       </p>

//       <div className="flex justify-between items-center mt-4">
//         <p className="text-sm text-gray-500">
//           📅{" "}
//           {date ||
//             `${projectData?.startDate} - ${projectData?.endDate}` ||
//             "No dates available"}
//         </p>
//         <p className="text-sm text-gray-500">{issues || 0} Issues</p>
//       </div>

//       <div className="flex items-center space-x-2 mt-4">
//         {roles.length > 0 ? (
//           roles.map((role, index) => (
//             <span
//               key={index}
//               className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
//             >
//               {role}
//             </span>
//           ))
//         ) : (
//           <div className="text-sm text-gray-500">No roles assigned</div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Add prop types for better type checking
// CreateProjectCard.propTypes = {
//   projectId: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   roles: PropTypes.array,
//   issues: PropTypes.number,
//   onDelete: PropTypes.func.isRequired,
// };

// export default CreateProjectCard;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import PropTypes from "prop-types";

function CreateProjectCard({ projectId, title, description, date, roles = [], issues, onDelete }) {
  const [projectData, setProjectData] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const navigate = useNavigate();

  // Fetch project from localStorage
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const foundProject = storedProjects.find((project) => project._id === projectId);

    if (foundProject) {
      console.log("Project found in localStorage:", foundProject);
      setProjectData(foundProject);
    } else {
      console.warn(`Project with ID ${projectId} not found in localStorage.`);
    }
  }, [projectId, title]); // Ensure it updates if title changes

  // Enable title edit mode
  const handleEditTitle = () => {
    console.log("Editing title:", newTitle);
    setIsEditingTitle(true);
  };

  // Save new title to localStorage
  const handleSaveTitle = () => {
    console.log(`Saving title change: ${newTitle}`);
    const updatedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProject = updatedProjects.map((project) =>
      project._id === projectId ? { ...project, title: newTitle } : project
    );

    localStorage.setItem("projects", JSON.stringify(updatedProject));
    setProjectData({ ...projectData, title: newTitle });
    setIsEditingTitle(false);
  };

  // Delete project
  const handleDeleteProject = () => {
    console.log(`Deleting project: ${projectId}`);
    onDelete(projectId);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 w-full max-w-[400px] mx-auto mb-4 cursor-pointer hover:shadow-lg transition duration-200"
      onClick={() => {
        console.log(`Navigating to project details: ${projectId}`);
        navigate(`/projectInfo/${projectId}`);
      }}
    >
      <div className="flex justify-between items-center">
        {isEditingTitle ? (
          <input
            type="text"
            className="border px-2 py-1 text-lg font-semibold text-gray-800 rounded"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
          />
        ) : (
          <h2 className="text-lg font-semibold text-gray-800">{newTitle || projectData?.title || "No Title Available"}</h2>
        )}

        <div className="flex items-center space-x-2">
          {isEditingTitle ? (
            <button onClick={handleSaveTitle} className="text-green-500 text-sm hover:underline">
              <FaSave className="inline-block" />
            </button>
          ) : (
            <button onClick={handleEditTitle} className="text-blue-500 text-sm hover:underline">
              <FaEdit className="inline-block" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteProject();
            }}
            className="text-red-500 text-sm hover:underline"
          >
            <FaTrash className="inline-block" />
          </button>
        </div>
      </div>

      <hr className="my-2 border-t border-gray-300" />

      <p className="text-sm text-gray-600 mt-2">{description || projectData?.description || "No description provided"}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          📅 {date || `${projectData?.startDate} - ${projectData?.endDate}` || "No dates available"}
        </p>
        <p className="text-sm text-gray-500">{issues || 0} Issues</p>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        {roles.length > 0 ? (
          roles.map((role, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              {role}
            </span>
          ))
        ) : (
          <div className="text-sm text-gray-500">No roles assigned</div>
        )}
      </div>
    </div>
  );
}

// Prop Types
CreateProjectCard.propTypes = {
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  roles: PropTypes.array,
  issues: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
};

export default CreateProjectCard;

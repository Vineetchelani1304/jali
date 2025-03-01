// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../../../components/sidebar/Sidebar";
// import Header from "../../../components/header/Header";
// import CreateProjectCard from "../../../components/created_project_card/CreateProjectCard";

// const ProjectsPage = () => {
//   const [projects, setProjects] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("userId");

//         if (!userId) {
//           throw new Error("User ID is missing. Please log in.");
//         }

//         const response = await fetch(`http://localhost:8080/api/project/${userId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch projects");
//         }

//         const data = await response.json();
//         console.log("Response:", data);

//         // ✅ Fix: Ensure data.data is an array
//         setProjects(Array.isArray(data.data) ? data.data : []);

//       } catch (error) {
//         setError(error.message);
//         setProjects([]); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleDeleteProject = async (projectId) => {
//     try {
//       const token = localStorage.getItem("token");
//       console.log(`Deleting project ${projectId}`);
//       const response = await fetch(`http://localhost:8080/api/project/remove/${projectId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete project");
//       }

//       setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen bg-gray-100">
//       <Header />
//       <Sidebar />
//       <div className="ml-56 mr-1 px-20 pt-24">
//         <div className="p-8 w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg mb-10 min-h-[75vh]">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold">Projects</h1>
//             <Link to="/createproject">
//               <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                 Create
//               </button>
//             </Link>
//           </div>

//           {loading ? (
//             <p className="text-gray-500">Loading projects...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : projects.length === 0 ? (
//             <p className="text-gray-500">No projects available</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onClick={()=>{
//               navigate('/projectInfo')
//             }}>
//               {projects.map((project) => (
//                 <CreateProjectCard
//                   key={project._id}
//                   projectId={project._id}
//                   title={project.title}
//                   description={project.description}
//                   date={`${project.startDate} - ${project.endDate}`}
//                   roles={project.roles}
//                   onDelete={handleDeleteProject}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/header/Header";
import CreateProjectCard from "../../../components/created_project_card/CreateProjectCard";
import axios from "axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log("token",token)

        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }

        console.log("Fetching projects for user:", userId);

        const response = await axios.get(`http://localhost:8080/api/project/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response Data:", response.data);
        
        // Ensure data.data is an array before setting state
        setProjects(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching project data:", error.response?.data || error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Deleting project ${projectId}`);

      await axios.delete(`http://localhost:8080/api/project/remove/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Project deleted successfully");
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Header />
      <Sidebar />
      <div className="ml-56 mr-1 px-20 pt-24">
        <div className="p-8 w-full max-w-7xl mx-auto bg-white shadow-md rounded-lg mb-10 min-h-[75vh]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Projects</h1>
            <Link to="/createproject">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                 Create Project
              </button>
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading projects...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">No projects available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project._id} onClick={() => navigate('/projectInfo')}>
                  <CreateProjectCard
                    projectId={project._id}
                    title={project.title}
                    description={project.description}
                    date={`${project.startDate} - ${project.endDate}`}
                    roles={project.roles}
                    onDelete={handleDeleteProject}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

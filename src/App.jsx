import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransitionManager from "./transitions/PageTransitionManager";
import Gateway from "./pages/Gateway";

// Layouts
import WebLayout from "./layouts/WebLayout";
import AILayout from "./layouts/AILayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ProjectComponent from "./components/projects/ProjectComponent";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import AIHome from "./pages/AIHome";
import { WebProjectList, AIProjectList } from "./utils/ProjectList";

function App() {
  return (
    <BrowserRouter>
      <PageTransitionManager>
        <Routes>
          {/* Entry Point */}
          <Route path="/" element={<Gateway />} />

          {/* Web Persona Routes */}
          <Route path="/web" element={<WebLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="projects"
              element={<ProjectComponent projectList={WebProjectList} />}
            />
            <Route path="projects/:projectName" element={<ProjectDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* AI Persona Routes */}
          <Route path="/ai" element={<AILayout />}>
            <Route index element={<AIHome />} />
            {/* Reusing these for now, or creating specific AI versions later */}
            <Route
              path="projects"
              element={<ProjectComponent projectList={AIProjectList} />}
            />
            <Route path="projects/:projectName" element={<ProjectDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </PageTransitionManager>
    </BrowserRouter>
  );
}

export default App;

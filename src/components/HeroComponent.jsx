import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

function Model({ url }) {
  const { scene } = useGLTF(url);

  return (
    <primitive
      object={scene}
      scale={7}
      position={[0, 0, 0]}
      rotation={[0, -0.35, 0]}
    />
  );
}

function HeroComponent() {
  return (
    <>
      <div className="w-full min-h-screen flex overflow-hidden">
        {/* Text Content Left Side */}
        <div className="w-1/2 flex flex-col items-start justify-center pl-20 text-white">
          {/* Greeting */}
          <div className="flex items-center mb-6">
            <span className="text-6xl mr-4">👋</span>
            <h1 className="text-6xl font-bold">I'm Ayush</h1>
          </div>

          {/* Professional Role with Gradient */}
          <div className="mb-8">
            <h2 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Full Stack Developer
            </h2>
          </div>

          {/* Welcome Message */}
          <p className="text-2xl text-gray-300 mb-3">
            Welcome to my digital playground!
          </p>
          <p className="text-xl text-gray-400 mb-10">Based in Mumbai, India.</p>

          {/* Connect Section */}
          <div className="flex items-center space-x-8">
            <a
              href="/src/assets/Resume.pdf"
              download="Ayush_Patel_Resume.pdf"
              className="flex items-center space-x-3 px-8 py-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-blue-900 transition-colors duration-300 text-lg cursor-pointer"
            >
              <FaDownload className="w-7 h-7" />
              <span>Download Resume</span>
            </a>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <a
                href="https://github.com/ayushptl1810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                <FaGithub className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayushptl1810/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                <FaLinkedin className="w-8 h-8" />
              </a>
              <a
                href="mailto:ayushptl1810@gmail.com"
                className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
              >
                <FaEnvelope className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Model Right Side */}
        <div className="w-1/2 h-screen relative">
          {/* Spotlight Effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>

          <Canvas
            camera={{ position: [0, 0, 12], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <directionalLight position={[-5, -5, -5]} intensity={0.4} />
              <Model url="/src/assets/optimized.glb" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
              />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default HeroComponent;

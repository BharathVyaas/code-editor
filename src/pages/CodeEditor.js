import Sandbox from "../components/CodeEditor/Sandbox";
import Details from "../components/CodeEditor/Details";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";

function CodeEditor() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-4">
        <img src={Naresh_IT_Logo} alt="Naresh IT Logo" className="h-12" />
      </header>
      <main className="flex-1 p-4 pt-2 lg:pt-0 lg:p-8 flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/2 border-r-2 border-gray-200 p-6 pb-0 overflow-y-auto">
          <Details />
        </aside>
        <section className="w-full lg:w-1/2 p-6 pb-0 relative">
          <Sandbox />
        </section>
      </main>
      <footer className="bg-white shadow-lg">
        {/* Add footer content if needed */}
      </footer>
    </div>
  );
}

export default CodeEditor;

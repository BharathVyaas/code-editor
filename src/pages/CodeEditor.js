import SideNav from "../components/CodeEditor/SideNav";
import Main from "../components/CodeEditor/Main";

function CodeEditor() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4"></header>
      <main className="flex-1 p-4 lg:p-8 flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/2 border-r-2 border-gray-200 p-4 overflow-y-auto">
          <SideNav />
        </aside>
        <section className="w-full lg:w-1/2 p-4 relative">
          <Main />
        </section>
      </main>
      <footer className="bg-white shadow-lg">
        {/* Add footer content if needed */}
      </footer>
    </div>
  );
}

export default CodeEditor;
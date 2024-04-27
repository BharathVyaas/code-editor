import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import store from "./redux";
import { Provider } from "react-redux";
import ProgramSubmmition from "./pages/ProgramSubmmition";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <ProgramSubmmition /> },
    { path: "/id", element: <CodeEditor /> },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import store from "./redux";
import { Provider } from "react-redux";
import ProgramSubmmition from "./pages/ProgramSubmmition";
import Error from "./shared/Error";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <ProgramSubmmition /> },
    { path: "/id", element: <CodeEditor /> },
    { path: "/error", element: <Error /> },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

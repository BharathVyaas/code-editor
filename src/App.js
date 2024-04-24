import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import store from "./redux";
import { Provider } from "react-redux";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <CodeEditor /> }]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

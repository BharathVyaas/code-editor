import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import store from "./redux";
import { Provider } from "react-redux";
import NotFound from "./pages/404 NotFound/NotFound";
import ProgramSubmmition from "./pages/Admin/ProgramSubmmition";
import ErrorBoundary from "./shared/ErrorBoundary";
import Auth from "./pages/Auth/Auth";
import { UserProvider } from "./context/UserContext";
import Problemset from "./pages/Problemset";

function App() {
  const router = createBrowserRouter([
    {
      path: "/problem/:problemId",
      element: <CodeEditor />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/programsubmmition",
      element: <ProgramSubmmition />,
      errorElement: <ErrorBoundary />,
    },
    { path: "/login", element: <Auth /> },
    { path: "/problemset", element: <Problemset /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <UserProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UserProvider>
  );
}

export default App;

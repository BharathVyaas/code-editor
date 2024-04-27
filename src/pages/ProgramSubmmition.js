import { Paper } from "@mui/material";

function ProgramSubmmition() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <nav className="flex">
          <ul className="flex">
            <li className="bg-white">
              <Paper elevation={3} className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Sample Input
                </h3>
                <div className="bg-gray-100 p-3 rounded mt-3">
                  <p className="text-sm text-gray-700">this is a placeholder</p>
                </div>
              </Paper>
            </li>
            <li className="bg-white">Task 2</li>
          </ul>
          <p>+</p>
        </nav>
      </div>
      <div className="w-full h-[20vh]"></div>
    </div>
  );
}

export default ProgramSubmmition;

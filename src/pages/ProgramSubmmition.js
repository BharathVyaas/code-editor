import { Editor } from "@monaco-editor/react";
import { useState } from "react";

import { Resizable } from "react-resizable";
function ProgramSubmmition() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  return (
    <div className="flex flex-wrap">
      <div className="relative" style={{ width }}>
        <Resizable
          width={width}
          height={height}
          minConstraints={[window.innerWidth * 0.2, window.innerHeight * 0.2]}
          maxConstraints={[window.innerWidth * 0.9, window.innerHeight * 0.9]}
          onResize={(_, { size }) => {
            setWidth(size.width);
            setHeight(size.height);
          }}
          handle={
            <div className="absolute top-0 right-0 w-1 bg-red-500 h-full cursor-e-resize"></div>
          }
        >
          <div style={{ width: width, height }} className="bg-gray-200">
            <Editor
              defaultLanguage="javascript"
              width="100%"
              height="100%"
              theme="vs-dark"
              value={String(width)}
              options={{ automaticLayout: true }}
            />
          </div>
        </Resizable>
      </div>
      <div
        style={{ width: window.innerWidth - width, height: height }}
        className="bg-yellow-300"
      >
        {width - window.innerWidth}
      </div>
      <div
        className="bg-green-400 w-full"
        style={{ height: window.innerHeight - height }}
      >
        {window.innerHeight - height}
      </div>
    </div>
  );
}

export default ProgramSubmmition;

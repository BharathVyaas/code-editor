import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import { connect } from "react-redux";
import MonacoEditor from "./sandbox/MonacoEditor";

function SandboxComponent({}) {
  // if (false) {
  //   return <Modal ModalView={() => <CodeEditorModal />} />;
  // }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "11%" }}
        className="bg-nareshit-primary border-b border-gray-200 px-4 py-2 flex items-center justify-between align-middle shadow-md"
      >
        <Options />
      </div>
      <div style={{ width: "100%", height: "88%", backgroundColor: "#FFFFFF" }}>
        {/* Adjust the backgroundColor value to the desired color */}
        <MonacoEditor />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const Sandbox = connect(mapStateToProps, mapDispatchToProps)(SandboxComponent);

export default Sandbox;

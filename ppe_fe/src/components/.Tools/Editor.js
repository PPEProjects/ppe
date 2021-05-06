import React, { useEffect, useState } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./Editor.constants";

const Editor = ({ editorData }) => {
  const [editorInstance, setEditorInstance] = useState(null);
  useEffect(() => {
    const handle = async () => {
      try {
        if (!editorInstance) return;
        await editorInstance.isReady;
        editorInstance.blocks.render({ blocks: JSON.parse(editorData) ?? [] });
      } catch (e) {}
    };
    handle();
  }, [editorData, editorInstance]);

  return (
    <EditorJs
      instanceRef={(instance) => setEditorInstance(instance)}
      readOnly={true}
    ></EditorJs>
  );
};

export default Editor;

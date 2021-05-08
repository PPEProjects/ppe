import React, { useEffect, useState } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./Editor.constants";

const Editor = ({ editorData }) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    const handle = async () => {
      if (!editorInstance || isFirst) return;
      await editorInstance.isReady;
      try {
        editorInstance.blocks.render({ blocks: JSON.parse(editorData) ?? [] });
      } catch (e) {}
      setIsFirst(true);
    };
    handle();
  }, [editorData, editorInstance]);

  return (
    <EditorJs
      tools={EDITOR_JS_TOOLS}
      instanceRef={(instance) => setEditorInstance(instance)}
      readOnly={true}
    ></EditorJs>
  );
};

export default Editor;

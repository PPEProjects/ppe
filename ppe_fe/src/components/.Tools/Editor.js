import React, {useEffect, useState} from "react";
import EditorJs from "react-editor-js";
import {EDITOR_JS_TOOLS} from "./Editor.constants";
// import {formSelector, setFormData} from "../slices/form";
// import {useDispatch, useSelector} from "react-redux";

const Editor = ({editorData}) => {
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        const handle = async () => {
            try{
                if (!editorInstance) return;
                await editorInstance.isReady;
                editorInstance.blocks.render({blocks: JSON.parse(editorData) ?? []})
            }catch (e) {}
        }
        handle()
    }, [editorData, editorInstance])
    

    return (
        // <section className={`border border-gray-400 rounded-md py-5 mt-4`}>
            <EditorJs
                // onChange={async (e) => {
                //     const data = await editorInstance.save()
                //     dispatch(setFormData({editorData: data?.blocks}))
                // }}
                instanceRef={instance => setEditorInstance(instance)}
             
                // data={data}
                // data={editorData ?? {
                //     "time": 1617627692481,
                //     "blocks": [
                //
                //     ],
                //     "version": "2.8.1"
                // }
                // }
            />
        // </section>

    );
}

export default Editor
import React, {useEffect, useState} from "react";
import EditorJs from "react-editor-js";
import {EDITOR_JS_TOOLS} from "./Editor.constants";
import {formSelector, setFormData} from "../slices/form";
import {useDispatch, useSelector} from "react-redux";

const Editor = () => {
    const [editorInstance, setEditorInstance] = useState(null);
    const {editorData} = useSelector(formSelector);
    const dispatch = useDispatch();
    const [isFirst, setIsFirst] = useState(false)

    useEffect(() => {
        const handle = async () => {
            if (!editorInstance || isFirst) return;
            await editorInstance.isReady;
            editorInstance.blocks.render({blocks: editorData ?? []})
            setIsFirst(true)
        }
        handle()
    }, [editorData, editorInstance])

    return (
        <section className={`border border-gray-400 rounded-md py-5 mt-4`}>
            <EditorJs
                tools={EDITOR_JS_TOOLS}
                onChange={async (e) => {
                    const data = await editorInstance.save()
                    dispatch(setFormData({editorData: data?.blocks}))
                }}
                instanceRef={instance => setEditorInstance(instance)}
                // data={{ blocks: [] }}
                // data={editorData ?? {
                //     "time": 1617627692481,
                //     "blocks": [
                //
                //     ],
                //     "version": "2.8.1"
                // }
                // }
            />
        </section>

    );
}

export default Editor

import React, { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { useEditor } from "@/utils/useEditor";
import classNames from "classnames";

interface EditorProps {
  initialDoc: string;
  onChange: (doc: string) => void;
}

// ?? (props: Props)
export const Editor: React.FC<EditorProps> = (props) => {
  const { onChange, initialDoc } = props;
  // returns state change func on onChange
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useEditor<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // blah
    } else {
      // blah
    }
  }, [editorView]);
  return (
    <div
      className={classNames(
        "w-1/2",
        "overflow-auto",
        "overflow-y-auto",
        "max-h-[80vh]"
      )}
      ref={refContainer}
    ></div>
  );
};

import React, { useRef, useState, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

interface useEditorProps {
  // CodeMirror, being a text editor, treats the document as a flat string.
  // It stores this in a tree-shaped data structure to allow cheap updates anywhere
  // in the document (and efficient indexing by line number).
  initialDoc: string;
  onChange?: (state: EditorState) => void;
}

export const useEditor = <T extends Element>(
  props: useEditorProps
): [React.MutableRefObject<T | null>, EditorView?] => {
  // useEditor returns a mutable object and editor view type in an array
  // persists refContainer value between renders
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange } = props;

  // hook creates and updates editor on [dependency array]
  useEffect(() => {
    if (!refContainer.current) return;
    const startState = EditorState.create({
      doc: props.initialDoc,
      // editor config
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ], // editor config
    });
    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);
    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refContainer]);
  return [refContainer, editorView];
};

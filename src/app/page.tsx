"use client";

import React, { useState, useCallback } from "react";
import { Editor } from "@/components/Editor";
import classNames from "classnames";
import { Preview } from "@/components/Preview";

const Home: React.FC = () => {
  const [doc, setDoc] = useState<string>("");
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  return (
    <main
      className={classNames(
        "min-h-screen",
        "px-32",
        "pt-10",
        "flex",
        "flex-col"
      )}
    >
      <h1 className={classNames("text-[30px]", "mb-4", "text-white")}>
        Markdown Editor
      </h1>
      <div className={classNames("flex flex-1 w-full gap-4")}>
        <Editor initialDoc={doc} onChange={handleDocChange} />
        <Preview doc={doc} />
      </div>
    </main>
  );
};

export default Home;

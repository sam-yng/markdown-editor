/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css/github-markdown.css";
import { CodeProps } from "react-markdown/lib/ast-to-react";

interface PreviewProps {
  doc: string;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  return (
    <div
      className={classNames(
        "bg-black",
        "px-4",
        "py-4",
        "markdown-body",
        "w-1/2",
        "overflow-y-auto",
        "max-h-[80vh]"
      )}
    >
      <ReactMarkdown
        children={props.doc}
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ node, ...props }) {
            return <pre {...props} />;
          },
          code({
            node,
            inline,
            className,
            children,
            style,
            ...props
          }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={prism}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

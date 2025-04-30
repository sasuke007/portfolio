"use client";

import { createBaseLexicalConfig } from '@/lib/lexical/config';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface ArticleProps {
    contentJSON: string;
}

// Placeholder component for content
function Placeholder() {
    return <div className="text-gray-400 italic absolute top-[1.125rem] left-[1.125rem]">Start typing...</div>;
}

// Error boundary component for editor
function ErrorBoundary({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export function Article({ contentJSON }: ArticleProps) {
    const initialConfig = createBaseLexicalConfig(contentJSON);
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container">
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="article-content prose prose-lg max-w-none p-4" />
                        }
                        placeholder={<Placeholder />}
                        ErrorBoundary={ErrorBoundary}
                    />
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <TablePlugin />
                </div>
            </div>
        </LexicalComposer>
    );
}
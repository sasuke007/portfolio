"use client";

import { createBaseLexicalConfig } from '@/lib/lexical/config';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface ArticleProps {
    contentJSON: string;
}

// Placeholder component for ErrorBoundary
function Placeholder() {
    return <div className="text-red-500 italic">Error loading article content.</div>;
}

export function Article({ contentJSON }: ArticleProps) {
    const initialConfig = createBaseLexicalConfig(contentJSON);
    
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className={`relative prose dark:prose-invert lg:prose-xl max-w-none mt-6 ${inter.className}`}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            aria-placeholder={''}
                            placeholder={<></>}
                        />
                    }
                    placeholder={
                        <></>
                    }
                    ErrorBoundary={Placeholder}
                />
            </div>
        </LexicalComposer>
    );
}
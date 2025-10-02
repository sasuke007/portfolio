"use client";

// All lexical imports removed for testing
// import { createBaseLexicalConfig } from '@/lib/lexical/config';
// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { ListPlugin } from '@lexical/react/LexicalListPlugin';
// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
// import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface ArticleProps {
    contentJSON: string;
}

export function Article({ contentJSON }: ArticleProps) {
    return (
        <div className="min-h-[400px] border rounded-md p-4 flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-600 mb-4">Hello World - Article Display Placeholder</h2>
                <p className="text-gray-500">Content JSON length: {contentJSON?.length || 0} characters</p>
            </div>
        </div>
    );
}
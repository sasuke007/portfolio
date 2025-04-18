import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { LinkNode } from '@lexical/link';
import { Klass, LexicalNode } from 'lexical';

// Example theme (customize or use Tailwind)
const editorTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'mb-4', // Add Tailwind classes or custom CSS classes
  quote: 'border-l-4 border-gray-500 pl-4 italic my-4',
  heading: {
    h1: 'text-4xl font-bold my-6',
    h2: 'text-3xl font-semibold my-5',
    h3: 'text-2xl font-semibold my-4',
    h4: 'text-xl font-semibold my-3',
    h5: 'text-lg font-semibold my-2',
    h6: 'text-base font-semibold my-1',
  },
  list: {
    nested: {
      listitem: 'ml-8',
    },
    ol: 'list-decimal list-inside my-4',
    ul: 'list-disc list-inside my-4',
    listitem: 'mb-2',
  },
  link: 'text-blue-500 hover:underline',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-gray-200 dark:bg-gray-700 text-sm font-mono px-1 py-0.5 rounded',
  },
  code: 'block bg-gray-100 dark:bg-gray-800 p-4 rounded my-4 text-sm font-mono overflow-x-auto',
  // ... other theme classes
};

// Define the nodes used in your editor
const editorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  LinkNode,
  // Add other nodes your editor uses (e.g., ImageNode, custom nodes)
];

// Base configuration function
export function createBaseLexicalConfig(
  editorStateJSON?: string // Optional initial state for rendering
): InitialConfigType {
  return {
    namespace: 'BlogArticle',
    theme: editorTheme,
    nodes: editorNodes,
    onError: (error: Error) => {
      console.error('Lexical Error:', error);
    },
    // IMPORTANT: Set editable to false for rendering
    editable: false,
    // Set initial state if provided (for rendering existing content)
    editorState: editorStateJSON,
  };
}
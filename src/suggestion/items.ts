// Convert to TypeScript
export interface SuggestionItem {
  title: string;
  command: ({ editor, range }: { editor: any; range: any }) => void;
  element?: React.ReactNode;
}

const getSuggestionItems = (query: string): SuggestionItem[] => {

  //log the query for debugging
  console.log("getSuggestionItems called with query:", query);
  const normalizedQuery = typeof query === "string" ? query : "";
  const items = [
    {
      title: "H1",
      command: ({ editor, range }: { editor: any; range: any }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      }
    },
    {
      title: "H2",
      command: ({ editor, range }: { editor: any; range: any }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      }
    },
    {
      title: "bold",
      command: ({ editor, range }: { editor: any; range: any }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      }
    },
    {
      title: "italic",
      command: ({ editor, range }: { editor: any; range: any }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      }
    },
    {
      title: "image",
      command: ({ editor, range }: { editor: any; range: any }) => {
        console.log("call some function from parent");
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      }
    }
  ]
    .filter((item) => item.title.toLowerCase().startsWith(normalizedQuery.toLowerCase()))
    .slice(0, 10);
  console.log("getSuggestionItems returned:", items);
  return items;
};

export default getSuggestionItems;

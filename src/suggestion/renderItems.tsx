// Convert to TypeScript
import { ReactRenderer } from "@tiptap/react";
import CommandList from "./CommandsList";
import { SuggestionItem } from "./items";

interface RenderItemsProps {
  editor: any;
  clientRect: () => DOMRect;
  items: SuggestionItem[];
  command: (item: SuggestionItem) => void;
  event: KeyboardEvent;
}

const renderItems = () => {
  let component: ReactRenderer | null;
  let menuDiv: HTMLDivElement | null = null;

  return {
    onStart: (props: RenderItemsProps) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor
      });

      // Remove any previous menu
      if (menuDiv) {
        menuDiv.remove();
      }

      // Create and style the menu div
      menuDiv = document.createElement("div");
      menuDiv.style.position = "absolute";
      menuDiv.style.zIndex = "9999";
      menuDiv.style.background = "#fff";
      menuDiv.style.border = "1px solid #ccc";
      menuDiv.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      menuDiv.style.padding = "4px";
      menuDiv.style.borderRadius = "4px";
      menuDiv.style.width = "200px";
      menuDiv.style.height = "200px";

      // Position the menu at the cursor
      const rect = props.clientRect();
      if (rect) {
        menuDiv.style.left = `${rect.left}px`;
        menuDiv.style.top = `${rect.bottom}px`;
      }

      // Add the React-rendered menu to the div
      menuDiv.innerHTML = "";
      // Render the items manually if ReactRenderer does not work
      if (props.items && props.items.length > 0) {
        props.items.forEach((item, index) => {
          const button = document.createElement("button");
          button.textContent = item.title;
          button.className = `item${index === 0 ? " is-selected" : ""}`;
          button.style.display = "block";
          button.style.width = "100%";
          button.style.textAlign = "left";
          button.style.padding = "8px";
          button.style.border = "none";
          button.style.background = "transparent";
          button.style.cursor = "pointer";
          button.onmouseenter = () => {
            // Highlight on hover
            Array.from(menuDiv!.children).forEach((el) => el.classList.remove("is-selected"));
            button.classList.add("is-selected");
          };
          button.onclick = () => {
            item.command({ editor: props.editor, range: (props as any).range });
            if (menuDiv) menuDiv.remove();
          };
          menuDiv.appendChild(button);
        });
      } else {
        menuDiv.appendChild(document.createTextNode("No items to show"));
      }

      // Append to body
      document.body.appendChild(menuDiv);
    },
    onUpdate(props: RenderItemsProps) {
      component?.updateProps(props);
      const rect = props.clientRect();
      if (menuDiv && rect) {
        menuDiv.style.left = `${rect.left}px`;
        menuDiv.style.top = `${rect.bottom}px`;
      }
    },
    onKeyDown(props: RenderItemsProps) {
      if (props.event.key === "Escape") {
        if (menuDiv) menuDiv.style.display = "none";
        return true;
      }
      return (component as any)?.ref?.onKeyDown(props);
    },
    onExit() {
      if (menuDiv) {
        menuDiv.remove();
        menuDiv = null;
      }
      component?.destroy();
    }
  };
};

export default renderItems;

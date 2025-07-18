import React, { useState, useEffect } from "react";
import { SuggestionItem } from "./items"; // Ensure SuggestionItem is correctly exported from './items'

interface CommandListProps {
  items: SuggestionItem[];
  command: (item: SuggestionItem) => void;
}

const CommandList: React.FC<CommandListProps> = ({ items, command }: CommandListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
    if (event.key === "ArrowUp") {
      upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      downHandler();
      return true;
    }

    if (event.key === "Enter") {
      enterHandler();
      return true;
    }


    return false;
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  const selectItem = (index: number) => {
    const item = items[index];

    if (item) {
      command(item);
    }
  };

  return (
    <div className="items">
      {items.map((item, index) => (
        <button
          className={`item ${index === selectedIndex ? "is-selected" : ""}`}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item.element || item.title}
        </button>
      ))}
    </div>
  );
};

export default CommandList;

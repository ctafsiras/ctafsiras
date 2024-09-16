"use client";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ClientReOrderProps {
  initialItems: string[];
  className: string;
  parentClassName: string;
}

export default function ClientReOrder({
  initialItems,
  className,
  parentClassName,
}: ClientReOrderProps) {
  const [items, setItems] = useState(initialItems);

  return (
    <Reorder.Group
      axis="x"
      onReorder={setItems}
      values={items}
      className={parentClassName}
    >
      {items.map((item: string) => (
        <Reorder.Item key={item} value={item}>
          <Badge variant="outline" className={className}>
            {item}
          </Badge>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

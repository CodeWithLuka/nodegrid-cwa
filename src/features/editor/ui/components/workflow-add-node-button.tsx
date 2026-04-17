"use client";

import { memo, useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NodeSelector } from "@/components/custom/node-selector";

export const WorkflowAddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        onClick={() => setSelectorOpen(true)}
        size="icon"
        variant="outline"
        className="bg-background"
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

WorkflowAddNodeButton.displayName = "WorkflowAddNodeButton";

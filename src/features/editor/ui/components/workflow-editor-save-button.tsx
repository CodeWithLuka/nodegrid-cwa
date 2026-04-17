import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WorkflowEditorSaveButtonProps {
  workflowId: string;
}

export const WorkflowEditorSaveButton = ({
  workflowId,
}: WorkflowEditorSaveButtonProps) => {
  //   const editor = useAtomValue(editorAtom);
  //   const saveWorkflow = useUpdateWorkflow();

  //   const handleSave = () => {
  //     if (!editor) {
  //       return;
  //     }

  // const nodes = editor.getNodes();
  // const edges = editor.getEdges();

  //     saveWorkflow.mutate({
  //       id: workflowId,
  //       nodes,
  //       edges,
  //     });
  //   }

  return (
    <div className="ml-auto">
      <Button
        size="sm"
        //   onClick={handleSave}
        onClick={() => {}}
        //   disabled={saveWorkflow.isPending}
        disabled={false}
      >
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};

import { Modal } from "./modal";

export default function OptionModal({
  params: { id: optionId },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <Modal>{optionId}</Modal>
    </div>
  );
}

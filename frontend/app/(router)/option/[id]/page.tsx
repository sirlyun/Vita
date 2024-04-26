export default function OptionModal({
  params: { id: optionId },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <p>{optionId}</p>
    </div>
  );
}

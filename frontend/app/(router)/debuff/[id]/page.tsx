export default function debuffModal({
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

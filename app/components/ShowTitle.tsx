export default function ShowTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-bold mb-2 whitespace-nowrap text-ellipsis overflow-hidden">
      {title}
    </h2>
  );
}

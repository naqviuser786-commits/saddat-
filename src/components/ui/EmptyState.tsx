export default function EmptyState({ message = "Nothing here yet." }: { message?: string }) {
  return <p>{message}</p>;
}
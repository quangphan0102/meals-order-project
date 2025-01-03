export default function TextButton({ children, ...props }) {
  return (
    <button className="text-button" {...props}>
      {children}
    </button>
  );
}

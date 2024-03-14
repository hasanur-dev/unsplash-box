export default function Button({ children, icon, onClick, url }) {
  const styles =
    "flex items-center gap-2 rounded-md border-gray-medium/30 bg-gray-medium/30 px-6 py-3 text-sm transition-colors duration-150 hover:border-gray-medium hover:bg-gray-medium/0";

  if (url)
    return (
      <a className={styles} href={url}>
        {children}
      </a>
    );
  else if (onClick) {
    return (
      <button onClick={onClick} className={styles}>
        {icon && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  } else {
    return (
      <button className={styles}>
        {icon && <span className="text-lg">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
}

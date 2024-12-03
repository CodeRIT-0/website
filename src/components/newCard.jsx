export function Card({ children, className }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h2 className={`text-xl font-bold text-gray-900 dark:text-white ${className}`}>
      {children}
    </h2>
  );
} 
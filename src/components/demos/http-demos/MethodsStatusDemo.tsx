import { useState } from "react";
import CodeBlock from "../../CodeBlock";

// A tiny in-memory "server" so every button press has a plausible,
// consistent outcome to react to - the point isn't the data, it's seeing
// which status code each method/URL combination produces and why.
const RESPONSES = [
  {
    method: "GET",
    url: "/users/7",
    status: 200,
    statusText: "OK",
    category: "success",
    note: "Resource exists - here it is.",
  },
  {
    method: "GET",
    url: "/users/999",
    status: 404,
    statusText: "Not Found",
    category: "client-error",
    note: "No user with that id exists.",
  },
  {
    method: "POST",
    url: "/users",
    status: 201,
    statusText: "Created",
    category: "success",
    note: "A new resource was created - the response often includes its new URL.",
  },
  {
    method: "PUT",
    url: "/users/7",
    status: 200,
    statusText: "OK",
    category: "success",
    note: "The whole resource was replaced with the request body.",
  },
  {
    method: "PATCH",
    url: "/users/7",
    status: 200,
    statusText: "OK",
    category: "success",
    note: "Only the fields in the request body were updated.",
  },
  {
    method: "DELETE",
    url: "/users/7",
    status: 204,
    statusText: "No Content",
    category: "success",
    note: "Deleted successfully - there's nothing meaningful to send back.",
  },
  {
    method: "POST",
    url: "/users (missing required field)",
    status: 400,
    statusText: "Bad Request",
    category: "client-error",
    note: "The request body didn't pass validation.",
  },
  {
    method: "GET",
    url: "/users/7 (server crashes)",
    status: 500,
    statusText: "Internal Server Error",
    category: "server-error",
    note: "Something went wrong on the server, not because of anything the client did.",
  },
];

const CATEGORY_STYLES = {
  success: "text-green-600 dark:text-green-400",
  "client-error": "text-amber-600 dark:text-amber-400",
  "server-error": "text-red-600 dark:text-red-400",
};

function MethodsStatusDemo() {
  const [log, setLog] = useState([]);

  const send = (entry) => {
    setLog((l) => [...l, entry]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Each button sends a different method to a different URL. Status codes
        aren&apos;t random - the first digit tells you the category before you
        even read the rest:{" "}
        <span className={CATEGORY_STYLES.success}>2xx success</span>,{" "}
        <span className={CATEGORY_STYLES["client-error"]}>
          4xx client error
        </span>
        ,{" "}
        <span className={CATEGORY_STYLES["server-error"]}>
          5xx server error
        </span>
        .
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        {RESPONSES.map((entry) => (
          <button
            key={`${entry.method}-${entry.url}`}
            onClick={() => send(entry)}
            className="bg-surface border border-line text-heading px-3 py-2 rounded hover:border-accent transition-colors text-sm"
          >
            {entry.method} {entry.url}
          </button>
        ))}
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-xs min-h-[120px] overflow-x-auto">
        {log.length === 0 && (
          <p className="text-subtle">Responses will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p key={i} className="mb-2 whitespace-pre-wrap">
            <span className="text-heading-alt">
              {entry.method} {entry.url} →{" "}
            </span>
            <span className={`font-bold ${CATEGORY_STYLES[entry.category]}`}>
              {entry.status} {entry.statusText}
            </span>
            <br />
            <span className="text-muted">{entry.note}</span>
          </p>
        ))}
      </div>

      <CodeBlock>{`const response = await fetch("/users", { method: "POST", body: JSON.stringify(data) });
// response.status === 201, response.ok === true`}</CodeBlock>
    </div>
  );
}

export default MethodsStatusDemo;

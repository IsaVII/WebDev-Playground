import { useState } from "react";
import CodeBlock from "../../CodeBlock";

function BufferDemo() {
  const [log, setLog] = useState([]);

  const fromString = () => {
    const text = "Hello Node.js";
    const buffer = Buffer.from(text);
    const bytes = Array.from(buffer).slice(0, 8).join(", ");
    setLog((l) => [
      ...l,
      `Buffer.from("${text}")`,
      `→ <Buffer ${bytes}...>`,
      `Length: ${buffer.length} bytes`,
    ]);
  };

  const toString = () => {
    const buffer = Buffer.from("Hello");
    setLog((l) => [
      ...l,
      "buffer.toString()",
      `→ "${buffer.toString()}"`,
      "✓ Decoded from bytes to string",
    ]);
  };

  const encoding = () => {
    const text = "Node.js";
    const utf8 = Buffer.from(text, "utf8");
    const base64 = utf8.toString("base64");
    const hex = utf8.toString("hex");

    setLog((l) => [
      ...l,
      `Buffer.from("${text}", "utf8")`,
      `→ UTF-8: <Buffer ${Array.from(utf8).join(", ")}>`,
      `→ Base64: "${base64}"`,
      `→ Hex: "${hex}"`,
    ]);
  };

  const alloc = () => {
    const size = 10;
    setLog((l) => [
      ...l,
      `Buffer.alloc(${size})`,
      `→ <Buffer 00 00 00 00 00 00 00 00 00 00>`,
      `✓ Allocated ${size} zero-filled bytes`,
    ]);
  };

  const concat = () => {
    const buf1 = Buffer.from("Hello");
    const buf2 = Buffer.from(" ");
    const buf3 = Buffer.from("World");
    const combined = Buffer.concat([buf1, buf2, buf3]);

    setLog((l) => [
      ...l,
      "Buffer.concat([buf1, buf2, buf3])",
      `→ "${combined.toString()}"`,
      `Length: ${combined.length} bytes`,
    ]);
  };

  const slice = () => {
    const buffer = Buffer.from("Hello World");
    const sliced = buffer.slice(0, 5);
    setLog((l) => [
      ...l,
      "buffer.slice(0, 5)",
      `→ "${sliced.toString()}"`,
      "⚠️ Shares memory with original buffer",
    ]);
  };

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        <code>Buffer</code> objects represent binary data - raw bytes that might
        not be text. They&apos;re essential for working with files, network
        protocols, images, or any non-text data. Buffers are fixed-size, unlike
        strings, and work directly with memory for performance.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={fromString}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Buffer.from()
        </button>
        <button
          onClick={toString}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .toString()
        </button>
        <button
          onClick={encoding}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Encodings
        </button>
        <button
          onClick={alloc}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Buffer.alloc()
        </button>
        <button
          onClick={concat}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          Buffer.concat()
        </button>
        <button
          onClick={slice}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
        >
          .slice()
        </button>
        <button
          onClick={() => setLog([])}
          className="text-sm text-subtle hover:text-accent transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      <div className="bg-surface rounded p-4 mb-4 border border-line font-mono text-sm min-h-[120px]">
        {log.length === 0 && (
          <p className="text-subtle text-xs">Output will appear here...</p>
        )}
        {log.map((entry, i) => (
          <p
            key={i}
            className={`text-xs ${entry.startsWith("⚠️") ? "text-yellow-400" : entry.startsWith("✓") ? "text-green-400" : "text-heading-alt"}`}
          >
            {entry}
          </p>
        ))}
      </div>

      <CodeBlock>{`// Create buffers
const buf1 = Buffer.from("Hello");        // from string
const buf2 = Buffer.from([72, 101, 108]); // from byte array
const buf3 = Buffer.alloc(10);            // allocate 10 zeros
const buf4 = Buffer.allocUnsafe(10);      // faster, uninitialized

// Convert to string
buf1.toString();          // "Hello" (default UTF-8)
buf1.toString("base64");  // "SGVsbG8="
buf1.toString("hex");     // "48656c6c6f"

// Manipulate
Buffer.concat([buf1, buf2]);  // Combine buffers
buf1.slice(0, 3);             // <Buffer 48 65 6c> (shares memory!)
buf1.length;                  // 5

// Write to buffer
const buf = Buffer.alloc(5);
buf.write("Hi");              // buf: <Buffer 48 69 00 00 00>

// Compare
buf1.equals(buf2);            // true if same bytes
Buffer.compare(buf1, buf2);   // -1, 0, or 1`}</CodeBlock>
    </div>
  );
}

export default BufferDemo;

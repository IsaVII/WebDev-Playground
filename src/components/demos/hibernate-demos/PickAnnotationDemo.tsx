import { useState } from "react";

const ITEMS = [
  {
    id: "entity",
    label: "Tell Hibernate that this class is stored as rows in a table",
    answer: "@Entity",
    explanation:
      "@Entity on the class makes its objects persistable. It needs a no-argument constructor and must not be final.",
  },
  {
    id: "id",
    label: "Mark the field that holds the primary key",
    answer: "@Id",
    explanation:
      "Every entity needs exactly one @Id (or a composite key). Putting it on a field also makes Hibernate read and write the fields directly.",
  },
  {
    id: "generated",
    label: "Let the database number new rows with an identity column",
    answer: "@GeneratedValue",
    explanation:
      "@GeneratedValue(strategy = GenerationType.IDENTITY) leaves the id null until persist, which has to send the INSERT at once to learn it.",
  },
  {
    id: "column",
    label: "Make a price column NOT NULL with precision 10 and scale 2",
    answer: "@Column",
    explanation:
      "@Column(nullable = false, precision = 10, scale = 2) tunes one column. Without it Hibernate maps the field to a column of the same name with defaults.",
  },
  {
    id: "manytoone",
    label: "Many products belong to one category - the field that is stored as the foreign key",
    answer: "@ManyToOne",
    explanation:
      "@ManyToOne on Product.category, with @JoinColumn(name = \"category_id\"), is the owning side: this field is what writes the foreign key.",
  },
  {
    id: "onetomany",
    label: "The category's list of products, which has no column of its own",
    answer: "@OneToMany(mappedBy)",
    explanation:
      "mappedBy = \"category\" names the owning field on Product. This side only mirrors the relationship, so set the owning side too or the foreign key stays NULL.",
  },
  {
    id: "enumerated",
    label: "Store an enum by its name instead of its position (0, 1, 2)",
    answer: "@Enumerated(STRING)",
    explanation:
      "The default, ORDINAL, stores the position, so inserting a constant in the middle silently changes the meaning of old rows. EnumType.STRING stores the name.",
  },
  {
    id: "joinfetch",
    label: "Load the categories and their products in a single SELECT",
    answer: "join fetch",
    explanation:
      "from Category c join fetch c.products loads both with a join instead of one extra SELECT per category - the usual cure for the N+1 problem.",
  },
];

const OPTIONS = [
  "@Entity",
  "@Id",
  "@GeneratedValue",
  "@Column",
  "@ManyToOne",
  "@OneToMany(mappedBy)",
  "@Enumerated(STRING)",
  "join fetch",
];

function PickAnnotationDemo() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allPicked = ITEMS.every((item) => picks[item.id]);
  const score = ITEMS.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        For each job, pick the annotation or query feature that does it. Each
        answer is right exactly once.
      </p>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const right = checked && picks[item.id] === item.answer;
          const wrong = checked && picks[item.id] && picks[item.id] !== item.answer;
          return (
            <div
              key={item.id}
              className={`rounded border p-3 ${
                right
                  ? "border-green-500 bg-green-500/10"
                  : wrong
                    ? "border-red-500 bg-red-500/10"
                    : "border-line"
              }`}
            >
              <p className="text-xs text-heading-alt mb-2">{item.label}</p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setChecked(false);
                      setPicks((p) => ({ ...p, [item.id]: option }));
                    }}
                    className={`font-mono text-xs px-3 py-1 rounded border ${
                      picks[item.id] === option
                        ? "bg-accent text-white border-accent"
                        : "border-line text-muted hover:text-accent"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {checked && wrong && (
                <p className="text-xs text-muted mt-2 mb-0 text-left">
                  → {item.answer}: {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={!allPicked}
          className="bg-accent text-white px-4 py-1 rounded text-sm hover:opacity-90 disabled:opacity-40"
        >
          Check
        </button>
        {checked && (
          <span className="text-sm font-semibold text-heading">
            {score} / {ITEMS.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default PickAnnotationDemo;

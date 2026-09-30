import { useDispatch, useSelector } from "react-redux";
import { fetchRandomValue } from "../../../redux/asyncValueSlice";
import CodeBlock from "../../CodeBlock";

function AsyncThunkDemo() {
  const { value, status } = useSelector((state) => state.asyncValue);
  const dispatch = useDispatch();
  const loading = status === "loading";

  return (
    <div className="bg-surface-alt border border-line rounded p-6">
      <p className="text-muted mb-4">
        Dispatching this thunk immediately fires a <code>pending</code> action,
        then a <code>fulfilled</code> action once the simulated request resolves
        - all without the component managing any loading state itself.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => dispatch(fetchRandomValue())}
          disabled={loading}
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch random value"}
        </button>
        <span className="text-2xl font-bold text-heading-alt tabular-nums">
          {status === "succeeded" ? value : "—"}
        </span>
      </div>

      <CodeBlock>{`export const fetchRandomValue = createAsyncThunk(
  "asyncValue/fetchRandomValue",
  async () => {
    const response = await fetch("/api/random");
    return response.json();
  },
);

// handled automatically in the slice:
builder.addCase(fetchRandomValue.pending, (state) => {
  state.status = "loading";
});
builder.addCase(fetchRandomValue.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.value = action.payload;
});`}</CodeBlock>
    </div>
  );
}

export default AsyncThunkDemo;

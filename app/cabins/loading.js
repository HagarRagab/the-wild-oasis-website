import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-primary-200 text-xl">Loading cabin details...</p>
    </div>
  );
}

export default Loading;

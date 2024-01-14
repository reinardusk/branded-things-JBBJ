export default function SubmitButton({ nameProp }) {
  return (
    <button
      type="submit"
      className="w-[80%] border-teal-500 border rounded hover:bg-blue-400 my-5 text-xl text-white bg-teal-500 font-bold"
    >
      {nameProp}
    </button>
  );
}

function InputError({ error }: { error: string }) {
  return <p className="text-red-500 font-primary text-sm pl-1">{error}</p>;
}

export default InputError;

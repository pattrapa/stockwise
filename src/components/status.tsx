export default function Status({ value }: { value: string }) {
  const style =
    value === "ปกติ"
      ? "bg-green-50 text-[#2F854D]"
      : value === "ใกล้หมด"
      ? "bg-orange-50 text-[#C67512]"
      : "bg-red-50 text-[#C53C3C]";

  return (
    <span
      className={`inline-flex min-w-19 items-center justify-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}
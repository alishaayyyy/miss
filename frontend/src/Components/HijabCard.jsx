// components/HijabCard.jsx
export default function HijabCard({ style, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer">
      <img src={style.image} alt={style.name} className="rounded-md h-48 w-full object-cover" />
      <h2 className="mt-2 text-lg font-bold">{style.name}</h2>
      <p className="text-sm text-gray-600">{style.description}</p>
    </div>
  );
}

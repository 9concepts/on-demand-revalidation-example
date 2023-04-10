import { WORK_IDS } from "@/const";

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-2xl">Experiment of On-Demand Revalidation</h1>

      {WORK_IDS.map((id) => (
        <iframe
          className="w-full"
          key={id}
          src={`http://localhost:3000/works/${id}`}
        />
      ))}
    </main>
  );
}

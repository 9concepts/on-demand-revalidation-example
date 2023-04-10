import { WORK_IDS } from "@/const";

export default function Home() {
  return (
    <main className="p-2 md:p-24 max-w-4xl m-auto">
      <h1 className="py-2 text-xl md:text-2xl">
        Experiment of On-Demand Revalidation
      </h1>

      {WORK_IDS.map((id) => (
        <iframe
          className="w-full h-56 md:h-auto"
          key={id}
          src={`/works/${id}`}
        />
      ))}

      <div>
        <div>
          GitHub:{" "}
          <a
            className="underline"
            href="https://github.com/9sako6/on-demand-revalidation-example"
            target="_blank"
          >
            9sako6/on-demand-revalidation-example
          </a>
        </div>
      </div>
    </main>
  );
}

import { WORK_IDS } from "@/const";

export default function Home() {
  return (
    <main className="p-24 max-w-4xl m-auto">
      <h1 className="text-2xl">Experiment of On-Demand Revalidation</h1>

      {WORK_IDS.map((id) => (
        <iframe
          className="w-full"
          key={id}
          src={`http://localhost:3000/works/${id}`}
        />
      ))}

      <div>
        <div>
          Author:{" "}
          <a
            className="underline"
            href="https://github.com/9sako6"
            target="_blank"
          >
            9sako6
          </a>
        </div>
        <div>
          GitHub:{" "}
          <a
            className="underline"
            href="https://github.com/9concepts/on-demand-revalidation-example"
            target="_blank"
          >
            9concepts/on-demand-revalidation-example
          </a>
        </div>
      </div>
    </main>
  );
}

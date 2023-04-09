import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl">Experiment of On-Demand Revalidation</h1>

      <iframe src="http://localhost:3000/works/foo" className="w-full h-96" />
    </main>
  );
}

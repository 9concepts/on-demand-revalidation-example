import { SLEEP_TIME, WORK_IDS } from "@/const";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";

const now = () => dayjs().format("YYYY-MM-DD HH:mm:ss (ZZ)");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = WORK_IDS.map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: "blocking",
  };
};

type Props = {
  id: string;
  getStaticPropsStartedAt: string;
  getStaticPropsFinishedAt: string;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const getStaticPropsStartedAt = now();
  const id = params?.id;

  if (typeof id !== "string" || !WORK_IDS.includes(id)) {
    return {
      notFound: true,
    };
  }

  await sleep(SLEEP_TIME);

  return {
    props: {
      id,
      getStaticPropsStartedAt,
      getStaticPropsFinishedAt: now(),
    },
  };
};

export default function Work(
  { id, getStaticPropsStartedAt, getStaticPropsFinishedAt }: Props,
) {
  const [currentAt, setCurrentAt] = useState<string>();

  useEffect(() => {
    setCurrentAt(now());
    const timeoutId = setTimeout(() => setCurrentAt(now()), 1000);

    return () => clearTimeout(timeoutId);
  }, [currentAt, setCurrentAt]);

  return (
    <div className="border">
      <h1>Work#{id}</h1>
      <div className="grid grid-cols-2">
        <div>
          <code className=" text-purple-400">getStaticProps</code> started at
        </div>
        <div className="font-mono">{getStaticPropsStartedAt}</div>
        <div>
          <code className=" text-purple-400">getStaticProps</code> stopped for
        </div>
        <div className="font-mono">{SLEEP_TIME} ms</div>
        <div>
          <code className=" text-purple-400">getStaticProps</code> finished at
        </div>
        <div className="font-mono">{getStaticPropsFinishedAt}</div>
        {currentAt && (
          <>
            <div>
              <code className=" text-purple-400">Date.now()</code>
            </div>
            <div className="font-mono">{currentAt}</div>
          </>
        )}
      </div>
    </div>
  );
}

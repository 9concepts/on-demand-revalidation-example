import { SLEEP_TIME, WORK_IDS } from "@/const";
import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const format = (timestamp: number) =>
  dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss (ZZ)");

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
  getStaticPropsStartedAt: number;
  getStaticPropsFinishedAt: number;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const getStaticPropsStartedAt = Date.now();
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
      getStaticPropsFinishedAt: Date.now(),
    },
    revalidate: false,
  };
};

export default function Work(
  { id, getStaticPropsStartedAt, getStaticPropsFinishedAt }: Props,
) {
  const [currentAt, setCurrentAt] = useState<string>();
  const [isRevalidating, setIsRevalidating] = useState(false);
  const router = useRouter();
  const { pathname, asPath } = router;

  const [startedAt, setStartedAt] = useState("");
  const [finishedAt, setFinishedAt] = useState("");

  useEffect(() => {
    setCurrentAt(format(Date.now()));
    const timeoutId = setTimeout(() => setCurrentAt(format(Date.now())), 1000);

    return () => clearTimeout(timeoutId);
  }, [currentAt, setCurrentAt]);

  useEffect(() => {
    setStartedAt(
      format(getStaticPropsStartedAt),
    );
    setFinishedAt(
      format(getStaticPropsFinishedAt),
    );
  }, [getStaticPropsStartedAt, getStaticPropsFinishedAt]);

  const handleClick = async () => {
    console.log("revalidate button clicked at", format(Date.now()));
    setIsRevalidating(true);
    const res = await fetch(
      "/api/revalidate",
      {
        method: "POST",
        body: JSON.stringify({
          id,
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET_TOKEN,
        }),
      },
    ).finally(() => setIsRevalidating(false));

    console.log("status of the revalidate request: ", res.status);

    if (res.ok) {
      router.push(
        {
          pathname,
        },
        asPath,
        {
          unstable_skipClientCache: true,
        },
      );
    }
  };

  return (
    <div className="border">
      <div className="flex justify-between items-center pb-1">
        <h1>Work#{id}</h1>
        {isRevalidating
          ? (
            <div className="bg-purple-500 text-white py-1 px-2">
              revalidating...
            </div>
          )
          : (
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white py-1 px-2"
              onClick={handleClick}
            >
              revalidate
            </button>
          )}
      </div>
      <div className="grid grid-cols-2">
        <div>
          Build started at
        </div>
        <div>{startedAt}</div>
        <div>
          Build stopped for
        </div>
        <div>{SLEEP_TIME} ms</div>
        <div>
          Build finished at
        </div>
        <div>{finishedAt}</div>
        {currentAt && (
          <>
            <div>
              <code className=" text-purple-400">Date.now()</code>
            </div>
            <div>{currentAt}</div>
          </>
        )}
      </div>
    </div>
  );
}

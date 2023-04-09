import dayjs from "dayjs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";

const now = () => dayjs().format("YYYY-MM-DD HH:mm:ss.SSS Z");

const WORK_IDS = ["foo"];

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

  return {
    props: {
      id,
      getStaticPropsStartedAt,
      getStaticPropsFinishedAt: now(),
    },
    revalidate: 1,
  };
};

export default function Work(
  { id, getStaticPropsStartedAt, getStaticPropsFinishedAt }: Props,
) {
  const [currentAt, setCurrentAt] = useState<string>();

  useEffect(() => {
    setCurrentAt(now());
    const timeoutId = setTimeout(() => setCurrentAt(now()), 1);

    return () => clearTimeout(timeoutId);
  }, [currentAt, setCurrentAt]);

  return (
    <div>
      <h1>Work#{id}</h1>
      <div className="grid grid-cols-2">
        <div>
          <code>getStaticProps</code> started at
        </div>
        <div>{getStaticPropsStartedAt}</div>
        <div>
          <code>getStaticProps</code> finished at
        </div>
        <div>{getStaticPropsFinishedAt}</div>
        {currentAt && (
          <>
            <div>current</div>
            <div>{currentAt}</div>
          </>
        )}
      </div>
    </div>
  );
}

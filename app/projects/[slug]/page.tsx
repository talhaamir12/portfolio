import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  // Check if this is a WIP project
  const isWIP = project.status === "wip";

  return (
    <div className={isWIP ? "bg-gradient-to-tl from-black via-zinc-900 to-black min-h-screen" : "bg-zinc-50 min-h-screen"}>
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      {isWIP ? (
        <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-yellow-600/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.586V5L8 4z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-zinc-100 mb-4 font-display">
              Under Construction
            </h1>
            
            <div className="flex items-center justify-center mb-6">
              <span className="px-3 py-1 text-sm bg-yellow-600/20 text-yellow-400 rounded-full">
                Work in Progress
              </span>
            </div>
            
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              This project is currently in development. Check back soon for updates, or follow the progress on GitHub.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {project.repository && (
                <a
                  href={`https://github.com/${project.repository}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors duration-200 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              )}
              <a
                href="/projects"
                className="inline-flex items-center px-6 py-3 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-zinc-100 rounded-lg transition-colors duration-200 font-medium"
              >
                ← Back to Projects
              </a>
            </div>
          </div>
        </div>
      ) : (
        <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
          <Mdx code={project.body.code} />
        </article>
      )}
    </div>
  );
}

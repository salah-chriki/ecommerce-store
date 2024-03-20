interface ArticlePageProps {
  title: string;
  children: React.ReactNode;
}
const ArticlePage = ({ title, children }: ArticlePageProps) => {
  return (
    <article className="max-w-3xl mb-24 px-10 pt-20 pb-10 mx-auto space-y-12 rounded-md  dark:bg-bannerColor dark:text-gray-50">
      <div className="w-full mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
      </div>
      <div className="dark:text-gray-100">{children}</div>
    </article>
  );
};

export default ArticlePage;

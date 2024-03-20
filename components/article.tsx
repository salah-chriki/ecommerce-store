"use client";
interface ArticleProps {
  title: string;
  paragraph: string;
}
const Article = ({ title, paragraph }: ArticleProps) => {
  return (
    <>
      <h2 className="font-bold text-2xl ">{title}</h2>
      <p className="font-sans text-gray-300">{paragraph}</p>
      <br></br>
    </>
  );
};

export default Article;

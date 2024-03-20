"use client";
interface BannerItemProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const BannerItem = ({ title, description, children }: BannerItemProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4">
      {children}
      <div className="space-y-1 leading-tight text-white">
        <p>{title}</p>
        <span className="text-xs text-white">{description}</span>
      </div>
    </div>
  );
};

export default BannerItem;

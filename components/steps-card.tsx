"use client";

interface StepsCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const StepsCard: React.FC<StepsCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-md p-8 dark:dark:bg-bannerColor">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold dark:dark:bg-buttonColor dark:dark:text-muted">
        {children}
      </div>
      <div>
        <p className="text-xl font-semibold">
          <b>{title}</b>
        </p>
      </div>
      <div>
        <p className="text-md text-center text-muted ">{description}</p>
      </div>
    </div>
  );
};

export default StepsCard;

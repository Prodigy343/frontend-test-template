import { FC } from "react";

interface LoadingProps {
  color?: string;
}

const Loading: FC<LoadingProps> = ({ color = "gray-500" }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-${color} border-opacity-50 w-[120px] h-[120px]`}
      />
    </div>
  );
};

export default Loading;
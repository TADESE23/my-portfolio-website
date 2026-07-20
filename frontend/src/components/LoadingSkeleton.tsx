import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'list' | 'project' | 'profile';
  count?: number;
}

const LoadingSkeleton: React.FC<SkeletonProps> = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'project':
        return (
          <div className="rounded-2xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card overflow-hidden shadow-md animate-pulse">
            <div className="h-48 bg-slate-200 dark:bg-slate-700 w-full" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slatebg-border">
                <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded w-24" />
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 bg-slate-200 dark:bg-slate-700 rounded-full" />
              <div className="space-y-4 flex-1">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
              </div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-11/12" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
          </div>
        );
      case 'card':
      default:
        return (
          <div className="rounded-xl p-6 bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border shadow-sm animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
};

export default LoadingSkeleton;

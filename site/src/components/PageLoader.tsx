"use client";

import Spinner from "@/components/ui/spinner";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="lg" />
        <p className="text-foreground-secondary text-lg poppins font-medium">
          Carregando...
        </p>
      </div>
    </div>
  );
}

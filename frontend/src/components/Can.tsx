import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface CanProps {
  permission: string;
  children: ReactNode;
}

function Can({ permission, children }: CanProps) {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return null;
  }

  return <>{children}</>;
}

export default Can;
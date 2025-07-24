import { toast, ToasterProps } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

export function showToast(type: ToastType, message: string) {
  const style: ToasterProps = {
    duration: 3000,
    position: "top-center",
    style: {
      background: "#fff",
      color: "#000",
      fontSize: "16px",
      padding: "16px",
      borderRadius: "8px",
    },
  };

  switch (type) {
    case "success":
      toast.success(message, style);
      break;
    case "error":
      toast.error(message, style);
      break;
    case "info":
      toast.info(message, style);
      break;
    case "warning":
      toast.warning(message, style);
      break;
  }
}

import { toast, ToasterProps } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

export function showToast(type: ToastType, message: string) {
  const baseStyle: ToasterProps["style"] = {
    fontSize: "16px",
    padding: "16px",
    borderRadius: "8px",
  };

  let style: ToasterProps = {
    duration: 3000,
    position: "top-center",
    style: baseStyle,
  };

  switch (type) {
    case "success":
      style.style = { ...baseStyle, background: "#D1FAE5", color: "#065F46" }; // verde claro
      toast.success(message, style);
      break;
    case "error":
      style.style = { ...baseStyle, background: "#FECACA", color: "#991B1B" }; // vermelho claro
      toast.error(message, style);
      break;
    case "info":
      style.style = { ...baseStyle, background: "#F9FAFB", color: "#1F2937" }; // branco/cinza escuro
      toast.info(message, style);
      break;
    case "warning":
      style.style = { ...baseStyle, background: "#FEF3C7", color: "#92400E" }; // amarelo claro
      toast.warning(message, style);
      break;
  }
}

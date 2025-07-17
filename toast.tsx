
// src/utils/toaster.ts
import toast from "react-hot-toast";
import { Icons } from "@/utils";
import { JSX } from "react";

type IconType =
  | "success"
  | "edit"
  | "error"
  | "cancel"
  | "warning"
  | "logout"
  | "loading"
  | "delete";

export type ToasterProp = {
  message?: string;
  title?: string;
  icon?: IconType;
  className?: "bg-red-50" | "bg-green-50" | "bg-yellow-50" | "bg-blue-50";
};

const colorType = {
  "bg-red-50": "!bg-red-500",
  "bg-green-50": "!bg-green-500",
  "bg-yellow-50": "!bg-yellow-500",
  "bg-blue-50": "!bg-blue-500",
}

let activeToast: string[] = [];

const   actionIcon: Record<IconType, JSX.Element> = {
  success: <Icons.check className="size-5 text-green-600" />,
  edit: <Icons.edit className="size-5 text-blue-600" />,
  error: <Icons.alert className="size-5 text-red-600" />,
  cancel: <Icons.cancel className="size-5 text-red-600" />,
  warning: <Icons.warning className="size-5 text-yellow-600" />,
  logout: <Icons.logout className="size-5 text-red-600" />,
  delete: <Icons.delete className="size-5 text-red-600" />,
  loading: (
    <Icons.loading className="size-5 animate-spin text-blue-600" />
  ),
};



export const toaster = ({
  message,
  title,
  icon = "success",
  className,
}: ToasterProp) => {
  if (activeToast?.length >= 3) {
    const oldToast = activeToast.shift();
    if (oldToast) toast.dismiss(oldToast);
  }

  const toastId = toast.custom(
    (t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave opacity-0"
          } max-w-sm w-full ${colorType[className]} shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black/5`}
      >
        <div className="flex-1 flex items-start p-4">
          <div className="flex-shrink-0">
            <div className="p-2.5  rounded-full bg-gray-50 border border-gray-100 shadow-sm">
              {actionIcon[icon] || actionIcon["success"]}
            </div>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            {title && (
              <p className="text-sm font-semibold text-white leading-5 mb-1">
                {title}
              </p>
            )}
            {message && (
              <p className="text-sm text-gray-100 leading-5">
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center border-l border-gray-100">
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-3 py-4 text-sm font-medium text-white hover:bg-gray-50 transition-all duration-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Close notification"
          >
            <Icons.x className="size-4" />
          </button>
        </div>
      </div>
    ),
    {
      position: "top-right",
      duration: icon === "loading" ? Infinity : 5000,
      style: {
        background: 'transparent',
        padding: '16px',
        margin: 0,
        boxShadow: 'none'
      }
    }
  );
  activeToast.push(toastId);
  return toastId;
};

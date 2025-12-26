
import ThemeToggle from "@/components/common/ThemeToggle";
import Dashboard from "@/components/dashboard/Dashboard";
import WidgetForm from "@/components/config/WidgetForm";

export default function HomePage() {
  return (
    <main
  className="min-h-screen p-6"
  style={{
    backgroundColor: "var(--bg-main)",
    color: "var(--text-main)",
  }}
>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">FinBoard</h1>
        <ThemeToggle />
      </div>

      <WidgetForm />
      <Dashboard />
    </main>
  );
}


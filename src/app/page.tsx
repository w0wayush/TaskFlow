import HeroPage from "@/components/pages/heropage/HeroPage";
import Navbar from "@/components/pages/navbar/Navbar";
// import TaskManagerDashboard from "@/components/pages/task-manager-dashboard/TaskManagerDashboard";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Task Management Dashboard or HeroPage based on if the user is logged-in or not */}
        <HeroPage />
      </div>
    </div>
  );
}

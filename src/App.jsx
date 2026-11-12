import { useState } from "react";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Work from "@/components/Work";

export default function App() {
  const [section, setSection] = useState("Home");
  return (
    <>
      <Nav section={section} />
      <main className="bg-bg pt-(--hh)">
        <Hero />
        <Work onSection={setSection} />
      </main>
    </>
  );
}

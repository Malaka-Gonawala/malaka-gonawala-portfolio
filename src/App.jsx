import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Work from "@/components/Work";

export default function App() {
  return (
    <>
      <Nav section="Home" />
      <main className="bg-bg pt-(--hh)">
        <Hero />
        <Work />
      </main>
    </>
  );
}

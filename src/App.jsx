import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function App() {
  return (
    <>
      <Nav section="Home" />
      <main className="bg-bg pt-(--hh)">
        <Hero />
      </main>
    </>
  );
}

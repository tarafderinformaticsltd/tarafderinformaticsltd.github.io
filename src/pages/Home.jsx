import Layout from "../components/Layout";
import { Band, Focus, Hero, Marquee } from "../components/sections";
import home from "../data/home.json";

export default function Home() {
  return (
    <Layout page="home">
      <Hero data={home.hero} />
      <Marquee data={home.marquee} />
      <Focus data={home.focus} />
      <Band data={home.band} />
    </Layout>
  );
}

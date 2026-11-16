import Layout from "../components/Layout";
import Cep from "../components/Cep";
import Contact from "../components/Contact";
import Programs from "../components/Programs";
import { Band, Focus, Hero, Marquee, Process, Why } from "../components/sections";
import cep from "../data/cep.json";
import contact from "../data/contact.json";
import home from "../data/home.json";
import programs from "../data/programs.json";
import volunteer from "../data/volunteer.json";

export default function Home() {
  return (
    <Layout page="home">
      <Hero data={home.hero} />
      <Marquee data={home.marquee} />
      <Focus data={home.focus} />
      <Cep data={cep} />
      <Programs data={programs} />
      <Process data={volunteer.process} />
      <Why data={volunteer.why} />
      <Contact data={contact} />
      <Band data={home.band} />
    </Layout>
  );
}

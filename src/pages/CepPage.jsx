import Layout from "../components/Layout";
import Cep from "../components/Cep";
import { Band } from "../components/sections";
import cep from "../data/cep.json";
import home from "../data/home.json";

export default function CepPage() {
  return (
    <Layout page="cep">
      <Cep data={cep} first />
      <div style={{ height: "6rem" }} />
      <Band data={home.band} />
    </Layout>
  );
}

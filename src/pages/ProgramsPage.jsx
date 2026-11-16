import Layout from "../components/Layout";
import Programs from "../components/Programs";
import programs from "../data/programs.json";

export default function ProgramsPage() {
  return (
    <Layout page="programs">
      <Programs data={programs} first />
    </Layout>
  );
}

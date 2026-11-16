import Layout from "../components/Layout";
import { Band, Process, Why } from "../components/sections";
import volunteer from "../data/volunteer.json";

export default function VolunteerPage() {
  return (
    <Layout page="volunteer">
      <Process data={volunteer.process} first />
      <Why data={volunteer.why} />
      <Band data={volunteer.band} />
    </Layout>
  );
}

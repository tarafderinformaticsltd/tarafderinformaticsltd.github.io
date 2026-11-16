import Layout from "../components/Layout";
import Contact from "../components/Contact";
import contact from "../data/contact.json";

export default function ContactPage() {
  return (
    <Layout page="contact">
      <Contact data={contact} first />
    </Layout>
  );
}

import { ethos } from "ethos-connect";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PrimaryFeatures from "../components/PrimaryFeatures";
import Container from "../components/Container";

function UnAuthed() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

function Projects() {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Projects
      </h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create new project
        </button>
      </div>
    </div>
  );
}

function Authed() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Projects />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  const { status, wallet } = ethos.useWallet();
  if (!wallet) {
    return <UnAuthed />;
  }
  return <Authed />;
}

import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Menu } from "../components/Menu";
import { Gallery } from "../components/Gallery";
import { Offers } from "../components/Offers";
import { Reservation } from "../components/Reservation";
import { Location } from "../components/Location";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Offers />
      <Reservation />
      <Location />
    </>
  );
}

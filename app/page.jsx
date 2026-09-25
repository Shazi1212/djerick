import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Stats from '@/components/home/Stats';
import Setlist from '@/components/Setlist';
import About from '@/components/home/About';
import Wall from '@/components/home/Wall';
import Guestbook from '@/components/Guestbook';
import FaqCta from '@/components/home/FaqCta';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Setlist />
      <About />
      <Wall />
      <Guestbook limit={3} />
      <FaqCta />
    </>
  );
}

import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative"
      style={{ backgroundImage: "url('/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 bg-black/[0.4]">
        <span>
          <Heading
            level="h1"
            className="text-5xl leading-tight text-white font-semibold mb-4 drop-shadow-lg"
          >
            Discover the Best Products Here
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-10 text-gray-100 font-normal drop-shadow-md"
          >
            Your Ultimate Destination for Excellence.
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <Button variant="primary" className="font-semibold text-base !px-10 !py-6 rounded-full shadow-xl hover:scale-105 transition-all duration-300 bg-emerald-500 text-white hover:bg-emerald-600 border-none">
            Explore Now
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero

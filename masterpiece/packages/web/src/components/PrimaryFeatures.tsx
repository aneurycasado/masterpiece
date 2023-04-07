import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  PencilIcon,
  CogIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "AI Art Generator",
    description:
      "Empower your creativity with our AI art generator. Create stunning digital artworks in seconds using our state-of-the-art deep learning algorithms.",
    icon: PencilIcon,
  },
  {
    name: "Customizable Options",
    description:
      "Our platform provides a variety of customization options, including colors, styles, and patterns, allowing you to create unique and original pieces of art that reflect your style and vision.",
    icon: CogIcon,
  },
  {
    name: "NFT Marketplace",
    description:
      "Sell your digital artworks as NFTs on our secure and decentralized marketplace. Our blockchain technology ensures the authenticity and provenance of each artwork, providing buyers with confidence in their purchase.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Community Building",
    description:
      "Connect with other artists, collectors, and art enthusiasts in our vibrant community. Get feedback, inspiration, and support to help you grow and develop your skills.",
    icon: ChatBubbleBottomCenterIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Create art faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to unleash your creativity
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            With Masterpiece, you have access to cutting-edge AI art generators
            that empower you to create stunning, unique digital artworks within
            seconds. Say goodbye to the time-consuming, labor-intensive process
            of traditional art creation and hello to a world of endless
            possibilities. Our platform offers a variety of customization
            options, including colors, styles, and patterns, so you can bring
            your artistic vision to life like never before.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

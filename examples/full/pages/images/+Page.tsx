export { Page };

import logoOld from "../../assets/logo.svg";
import logoNew from "../../assets/logo-new.svg";
import { Counter } from "../../components/Counter";
import { useConfig } from "vike-solid/useConfig";

function Page() {
  return (
    <>
      <p>
        Page showcasing <code>{"<Image>"}</code> component, with structured data (see HTML).
      </p>
      <div>
        New logo: <Image src={logoNew} author="brillout" />
      </div>
      <br />
      <div>
        Old logo: <Image src={logoOld} author="Romuald Brillout" />
      </div>
      <br />
      <Counter />
    </>
  );
}

function Image({ src, author }: { src: string; author: string }) {
  const config = useConfig();

  config({
    Head: (
      <script
        type="application/ld+json"
        innerHTML={JSON.stringify({
          "@context": "https://schema.org/",
          contentUrl: { src },
          creator: {
            "@type": "Person",
            name: author,
          },
        })}
      ></script>
    ),
  });
  return (
    <>
      <img src={src} height={48} style={{ "vertical-align": "middle", "margin-left": "10px" }} />
    </>
  );
}

import { slug } from "github-slugger";

const createHeadingWithSlug = (
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
) => {
  return function HeadingWithSlug({ children }: { children: string }) {
    const idSlug = slug(children);
    return <Tag id={idSlug}>{children}</Tag>;
  };
};

const components: Record<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  ReturnType<typeof createHeadingWithSlug>
> = {
  h1: createHeadingWithSlug("h1"),
  h2: createHeadingWithSlug("h2"),
  h3: createHeadingWithSlug("h3"),
  h4: createHeadingWithSlug("h4"),
  h5: createHeadingWithSlug("h5"),
  h6: createHeadingWithSlug("h6"),
};

export default components;

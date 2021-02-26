import { Nullable, Params, PostOrPage } from "@tryghost/content-api";
import { ghost } from "@services/ghost/connect";

const defaultOptions: Params = {
  fields: [
    "id",
    "title",
    "slug",
    "feature_image",
    "excerpt",
    "custom_excerpt",
    "html",
  ],
  include: ["tags", "authors"],
  order: "published_at DESC",
};

export const getSinglePost = async (
  data: { id: Nullable<string> } | { slug: Nullable<string> },
  options?: Params
): Promise<void | PostOrPage> =>
  ghost.posts.read(data, { ...defaultOptions, ...options }).catch((err) => {
    console.error(err);
  });

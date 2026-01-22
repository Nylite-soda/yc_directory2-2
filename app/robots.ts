import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        crawlDelay: 10,
        disallow: ['/user/'],
      },
    ],
  };
}

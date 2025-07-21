import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";
import LoadingLink from "./LoadingLink";
import ImagePlaceholder from "./ui/ImagePlaceholder";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    title,
    category,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group flex flex-col">
      <div className="flex-grow">
        <div className="flex-between">
          <p className="startup-card_date">{formatDate(_createdAt)}</p>

          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-primary" />
            <span className="text-16-medium">{views}</span>
          </div>
        </div>

        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <LoadingLink href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </LoadingLink>
            <LoadingLink href={`/startup/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1 break-all">
                {title}
              </h3>
            </LoadingLink>
          </div>
          <LoadingLink href={`/user/${author?._id}`}>
            {author?.image ? (
              <Image
                src={author.image}
                alt={author.name || "author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <ImagePlaceholder
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
          </LoadingLink>
        </div>

        <LoadingLink href={`/startup/${_id}`}>
          <p className="startup-card_desc">{description}</p>
          {image ? (
            <Image
              src={image}
              alt={title || "startup image"}
              width={500}
              height={164}
              className="startup-card_img mt-3"
            />
          ) : (
            <ImagePlaceholder
              width={500}
              height={164}
              className="startup-card_img mt-3"
            />
          )}
        </LoadingLink>
      </div>
      <div className="flex-between gap-3 mt-5">
        <LoadingLink href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium break-all">{category}</p>
        </LoadingLink>
        <Button className="startup-card_btn" asChild>
          <LoadingLink href={`/startup/${_id}`}>Details</LoadingLink>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};

export default StartupCard;

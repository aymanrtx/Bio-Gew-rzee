import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { Title } from "@/components/text"; 
import { getCategories } from "@/sanity/queries";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await getCategories();
  const { slug } = await params;
  
  const decodedSlug = slug ? decodeURIComponent(slug) : '';

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
      <Container>
        <Title
          className="
            text-center 
            sm:text-left 
            text-xl 
            sm:text-2xl 
            lg:text-3xl 
            leading-snug 
            break-words
          "
        >
          Products by Category:{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {decodedSlug}
          </span>
        </Title>

        <div className="mt-8">
          <CategoryProducts categories={categories} slug={slug} />
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;

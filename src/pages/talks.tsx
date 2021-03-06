import React from "react";
import { PageContainer } from "@shared/Page";
import {
  BasicTalkPartsFragment,
  Enum_Talk_Type,
  TalksPageDocument,
  TalksPageQuery,
} from "@generated/graphql";
import { TalkHero } from "@components/Talk";
import { initializeApollo } from "@services/apollo";
import TalkCategorySection from "@components/Talk/TalkCategorySection";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import TalkYoutubeSection from "@components/Talk/TalkYoutubeSection";

interface Props {
  featuredTalks: BasicTalkPartsFragment[];
  mvsp: BasicTalkPartsFragment[];
  ring: BasicTalkPartsFragment[];
  classic: BasicTalkPartsFragment[];
  expert: BasicTalkPartsFragment[];
}

const Talks: React.FC<Props> = ({
  featuredTalks,
  mvsp,
  ring,
  classic,
  expert,
}) => {
  const { t } = useTranslation("talks");

  return (
    <PageContainer>
      <NextSeo title={t("SEO.title")} description={t("SEO.description")} />
      <TalkHero featuredTalks={featuredTalks} />
      <TalkCategorySection type={Enum_Talk_Type.Mvsp} talks={mvsp} />
      <TalkCategorySection type={Enum_Talk_Type.Classic} talks={classic} />
      <TalkCategorySection type={Enum_Talk_Type.Ring} talks={ring} />
      <TalkCategorySection type={Enum_Talk_Type.Expert} talks={expert} />
      <TalkYoutubeSection />
    </PageContainer>
  );
};

export const getStaticProps = async (): Promise<{
  props: Props;
  revalidate: number;
}> => {
  const client = initializeApollo();

  const { data } = await client.query<TalksPageQuery>({
    query: TalksPageDocument,
  });

  return {
    revalidate: 30,
    props: {
      featuredTalks: data.featured,
      mvsp: data.mvsp,
      ring: data.ring,
      classic: data.classic,
      expert: data.expert,
    },
  };
};

export default Talks;

import React, { useEffect, useState } from "react";
import {
  QuizType,
  ResultsCompassPartsFragment,
  ResultsPartsFragment,
  ResultsPoliticianPartsFragment,
} from "@generated/graphql";
import {
  Axes,
  Compass,
  Description,
  Ideology,
  Party,
  PoliticianInfo,
  Traits,
} from "@components/Results";
import ShareSocial from "@shared/ShareSocial";
import { Like } from "react-facebook";
import useTranslation from "next-translate/useTranslation";
import { EditorCTA } from "@components/Editor";
import { Vote } from "@components/Quiz";
import { Col, Container, Row } from "./ResultsContentStyle";
import { translate } from '@utils/translation';

interface Props {
  results: ResultsPartsFragment;
  politician?: ResultsPoliticianPartsFragment;
}

const ResultsContent: React.FC<Props> = ({ results, politician }) => {
  const { t, lang } = useTranslation("results");
  const hasParties = results.parties.length > 0;
  const hasTraits = results.traits.length > 0;
  const hasAxes = results.axes.length > 0;
  const [compass, setCompass] = useState<
    ResultsCompassPartsFragment | undefined
  >(results.compasses[0]);
  const compassesString = JSON.stringify(results.compasses);
  const authorizedPartiesIds = results.quiz.meta.features.authorizedParties.map(
    (p) => p.id
  );
  const hasAdditional = hasParties || compass || hasTraits;
  const hasAxesAndAdditional = hasAxes && hasAdditional;

  useEffect(() => {
    if (results.compasses.length > 0) {
      setCompass(results.compasses[0]);
    }
  }, [compassesString]);

  return (
    <Container>
      {politician && <PoliticianInfo politician={politician} />}
      <Description />
      <Row cols={hasAxesAndAdditional ? 2 : 1}>
        {hasAxes && (
          <Col>
            <Axes results={results} />
          </Col>
        )}
        {hasAdditional && (
          <Col>
            {compass && (
              <>
                <Ideology compassMode={compass} />
                <Compass
                  selectedCompass={compass}
                  onChange={setCompass}
                  compasses={results.compasses}
                />
              </>
            )}
            {hasParties && (
              <Party
                authorizedPartiesIds={authorizedPartiesIds}
                parties={results.parties}
              />
            )}
            {hasTraits && <Traits traits={results.traits} />}
          </Col>
        )}
      </Row>
      {results.quiz.type === QuizType.Community && (
        <Vote quizId={results.quiz.id} value={results.quiz.meta.votes.value} />
      )}
      <EditorCTA />
      <ShareSocial
        message={`${t("content.checkOut")} ${translate(results.quiz.title, lang)}!`}
      />
      <Like
        href="http://www.facebook.com/myPoliticsTest"
        width="450"
        size="large"
      />
    </Container>
  );
};

export default ResultsContent;

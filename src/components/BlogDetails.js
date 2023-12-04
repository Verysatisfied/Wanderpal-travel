import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import styled from "styled-components";
import { Link } from "react-router-dom";
const BlogDetail = () => {
  const [topicDetails, setTopicDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    axios
      .get(
        `https://health.gov/myhealthfinder/api/v3/topicsearch.json?TopicId=${id}`
      )
      .then((response) => {
        const data = response.data;

        if (
          data &&
          data.Result &&
          data.Result.Resources &&
          data.Result.Resources.Resource
        ) {
          const details = data.Result.Resources.Resource;
          setTopicDetails(details[0]);
        } else {
          console.error("Unexpected data structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching topic details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const stripHtmlTags = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText;
  };

  return (
    <BlogContainer>
      {loading ? (
        <RingLoader size={100} color="#007bff" loading={loading} />
      ) : (
        <>
          <h1>{topicDetails.Title || "Loading..."}</h1>
          <p>Categories: {topicDetails.Categories}</p>
          <img
            className="img img-narrow"
            src={topicDetails.ImageUrl}
            alt={topicDetails.ImageAlt}
          />

          <section>
            {topicDetails.Sections &&
              topicDetails.Sections.section.map((section, index) => (
                <div key={index}>
                  <Section>
                    <SectionTitle>{section.Title}</SectionTitle>
                    <SectionContent>
                      {stripHtmlTags(section.Content)}
                    </SectionContent>
                  </Section>
                </div>
              ))}
            <Link className="back" to="/blog">
              Back to articles
            </Link>
          </section>
          <ReadMoreSection>
            <h5>Finished reading? Wanna read more?</h5>
            {topicDetails.RelatedItems && (
              <ReadMoreContainer>
                {topicDetails.RelatedItems.RelatedItem.map((item, index) => (
                  <div key={index}>
                    <CardTitle>{item.Title}</CardTitle>
                    <CardLink href={item.Url}>Read it</CardLink>
                  </div>
                ))}
              </ReadMoreContainer>
            )}
          </ReadMoreSection>
        </>
      )}
    </BlogContainer>
  );
};
const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 70px;
  @media (max-width: 768px) {
    padding: 10px;
    .img-narrow {
      max-height: 50px;
      width: auto;
    }
  }

  .img {
    max-height: 400px;
    width: auto;
  }
  .back {
    &:hover {
      border-bottom: 2px solid #4a9fe0;
    }
  }
`;
const Section = styled.section`
  text-align: center;
  margin-top: 20px;
`;

const SectionTitle = styled.h4`
  text-align: center;
`;

const SectionContent = styled.p`
  text-align: left;
  text-justify: distribute;
  hyphens: auto;
`;

const ReadMoreContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h6`
  font-size: 18px;
  margin: 0;
`;

const CardLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    border-bottom: 2px solid #4a9fe0;
  }
`;

const ReadMoreSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default BlogDetail;

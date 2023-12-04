import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaFileAlt } from "react-icons/fa";
import { RingLoader } from "react-spinners";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const BlogPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    axios
      .get("https://health.gov/myhealthfinder/api/v3/itemlist.json?Type=topic")
      .then((response) => {
        const topicsData = response.data.Result.Items.Item;
        setTopics(topicsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topics.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <BlogContainer>
      <h1>Know a little bit more about your body every day!</h1>
      <BlogList>
        {loading ? (
          <LoadingContainer>
            <RingLoader color="#007bff" loading={loading} size={100} />
          </LoadingContainer>
        ) : (
          currentItems.map((topic) => (
            <BlogItem key={topic.Id}>
              <Title>
                <ArticleIcon /> {topic.Title}
              </Title>
              <ReadLink to={`/blog/${topic.Id}`}>Read this article</ReadLink>
              <Content>{topic.PartialContent}</Content>
            </BlogItem>
          ))
        )}
      </BlogList>
      <Pagination>
        <Wrapper>
          {currentPage > 1 && (
            <PaginationItem
              className="prev-btn"
              onClick={() => paginate(currentPage - 1)}
            >
              <HiChevronDoubleLeft />
            </PaginationItem>
          )}
          {topics.length > itemsPerPage &&
            Array(Math.ceil(topics.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <PaginationItem
                  key={index}
                  className={
                    index + 1 === currentPage ? "pageBtn active" : "pageBtn"
                  }
                  onClick={() => paginate(index + 1)}
                  active={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationItem>
              ))}
          {currentPage < Math.ceil(topics.length / itemsPerPage) && (
            <PaginationItem
              className="next-btn"
              onClick={() => paginate(currentPage + 1)}
            >
              <HiChevronDoubleRight />
            </PaginationItem>
          )}
        </Wrapper>
      </Pagination>
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }

  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
`;

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BlogItem = styled.li`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ArticleIcon = styled(FaFileAlt)`
  font-size: 20px;
  margin-right: 10px;
  color: #007bff;
`;

const ReadLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  &:hover {
    border-bottom: 2px solid #4a9fe0;
  }
`;

const Content = styled.p`
  font-size: 16px;
  color: #666;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  margin-top: 20vh;
`;
const Pagination = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

const PaginationItem = styled.li`
  cursor: pointer;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#007bff")};
  border: 1px solid #007bff;
  border-radius: 50%;
  padding: 5px 10px;
`;

export default BlogPage;

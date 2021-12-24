import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("CryptoCurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loading loading={isFetching} />;
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a news category"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="CryptoCurrency">CryptoCurrency</Option>
              {data?.data?.coins.map((coin, idx) => (
                <Option key={idx} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNews.value.map((news, index) => (
          <Col key={index} xs={24} sm={24} lg={8}>
            <Card hoverable className="news-card" loading={isFetching}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxwidth: "200px", maxHeight: "100px" }}
                    src={
                      news?.image?.thumbnail?.contentUrl ||
                      "https://exchange4media.gumlet.io/news-photo/95662-ReportMain.jpg?format=webp&w=400&dpr=2.6"
                    }
                    alt={news.name}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? news.description.substring(0, 100) + "..."
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
                      }
                    />
                    <Text className="provider-name">
                      {news?.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;

const Loading = (loading) => {
  const temp = [1, 2, 3, 4];
  return (
    <Row gutter={[24, 24]}>
      {temp.map((item) => (
        <Card
          key={item}
          style={{ width: 300, marginTop: 16 }}
          loading={loading}
        ></Card>
      ))}
    </Row>
  );
};

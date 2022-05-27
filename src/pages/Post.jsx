import { colors, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Post = () => {
  const { slug } = useParams();
  const post = useSelector((state) => state.posts).find(
    (item) => item.slug === slug
  );

  const RenderBody = ({ item }) => {
    console.log(item);
    switch (item.contentType) {
      case "Heading 1":
        return (
          <Typography variant="h4" fontWeight="bold">
            {item.content}
          </Typography>
        );

      case "Heading 2":
        return (
          <Typography variant="h5" fontWeight="bold">
            {item.content}
          </Typography>
        );

      case "Heading 3":
        return (
          <Typography variant="h6" fontWeight="bold">
            {item.content}
          </Typography>
        );

      case "Image":
        return <Typography>{item.content.name}</Typography>;

      case "Quote":
        return <Typography>{item.content}</Typography>;

      default:
        return <Typography>{item.content}</Typography>;
    }
  };
  return (
    <Box width="90%" mx="auto" my="20px">
      <Typography variant="h3" fontWeight="bold">
        {post.title}
      </Typography>
      <Typography
        sx={{ width: "250px", my: "15px" }}
        fontSize="15px"
        color={colors.grey[400]}
      >
        {post.excerpt}
      </Typography>

      <Divider />
      {post.body?.map((item, index) => (
        <RenderBody key={index} item={item} />
      ))}
    </Box>
  );
};

export default Post;

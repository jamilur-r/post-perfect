import { DynamicFeed } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  colors,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <Box width="100%" height="auto" minHeight="100vh">
      <Stack
        spacing={2}
        width="90%"
        sx={{
          height: "auto",
          minHeight: "calc(100vh - 50px)",
          mx: "auto",
        }}
      >
        <Box
          width="100%"
          px="10px"
          py="15px"
          boxSizing="border-box"
          borderRadius={2}
          bgcolor={colors.amber[50]}
          mt="20px"
        >
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Badge badgeContent={`${posts.length}`} color="primary">
              <DynamicFeed />
            </Badge>
            <Button variant="contained" component={Link} to="/post/new">
              {posts.length > 0 ? "Add new post" : "Write your first blog"}
            </Button>
          </Stack>
        </Box>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {posts?.map((item) => (
            <Grid item key={item.slug}>
              <Card sx={{ width: "290px" }}>
                <CardMedia
                  src={item.featuredImage.name}
                  component="img"
                  height="140"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.excerpt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/post/${item.slug}`}
                  >
                    Read
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default Home;

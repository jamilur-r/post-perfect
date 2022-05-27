import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postValidationSchema } from "../validations/post";
import { slugify } from "../utils/util";
import { Cancel, FormatQuote, Image } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { postActions } from "../store/postReducer";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const resolver = yupResolver(postValidationSchema);
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      featuredImage: null,
      excerpt: "",
      body: [],
    },
    mode: "onChange",
    resolver,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "body" });
  const slug = useWatch({ control, name: "slug" });
  const title = useWatch({ control, name: "title" });
  const body = useWatch({ control, name: "body" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setValue("slug", slugify(title));
  }, [title]);

  const addpost = (data) => {
    dispatch(postActions.addPost({ post: data }));
    navigate("/");
  };

  return (
    <Box width="100%" height="auto" minHeight="100vh">
      <Box width="90%" mx="auto" height="100%" minHeight="100vh">
        <Stack
          spacing={2}
          sx={{
            my: "20px",
            padding: "20px 15px",
            boxSizing: "border-box",
            border: "2px solid rgba(0,0,0,0.2)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Post Information
          </Typography>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ flexGrow: 1 }} error={errors?.title}>
              <InputLabel>Post Title</InputLabel>
              <OutlinedInput
                {...register("title")}
                type="text"
                label="Post title"
                placeholder="Post title, ie - How to write blog post "
              />
              <FormHelperText>{errors?.title?.message}</FormHelperText>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }} error={errors?.slug}>
              <InputLabel>Post url</InputLabel>
              <OutlinedInput
                value={slug}
                {...register("slug")}
                readOnly
                type="text"
                label="Post url"
                placeholder="Post url - auto generated"
              />
              <FormHelperText>{errors?.slug?.message}</FormHelperText>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormControl sx={{ flexGrow: 1 }} error={errors?.excerpt}>
              <InputLabel>Post Short Description</InputLabel>
              <OutlinedInput
                {...register("excerpt")}
                multiline
                type="text"
                label="Post Short Description"
                placeholder="Post Short Description, ie - this post will teach you how to write your blog"
              />
              <FormHelperText>{errors?.excerpt?.message}</FormHelperText>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }} error={errors?.featuredImage}>
              <input
                type="file"
                placeholder="Upload Featured Image"
                sx={{
                  "::-ms-browse": {
                    backgroundColor: "black",
                    color: "red",
                    padding: "1em",
                  },
                }}
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  if (event.target?.files) {
                    setValue("featuredImage", event.target.files[0]);
                  }
                }}
              />
              <FormHelperText>{errors?.featuredImage?.message}</FormHelperText>
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              variant="contained"
              onClick={handleSubmit(addpost)}
              disabled={body?.length <= 0}
            >
              Publish
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={2} justifyContent="flex-start">
          {fields.map((field, index) => (
            <Stack
              key={index}
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  width="auto"
                  bgcolor="#272739"
                  borderRadius={2}
                  display="flex"
                >
                  <Button
                    color="secondary"
                    onClick={() => {
                      setValue(`body.${index}.contentType`, "Heading 1");
                    }}
                  >
                    H1
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setValue(`body.${index}.contentType`, "Heading 2");
                    }}
                  >
                    H2
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setValue(`body.${index}.contentType`, "Heading 2");
                    }}
                  >
                    H3
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setValue(`body.${index}.contentType`, "Paragraph");
                    }}
                  >
                    P
                  </Button>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setValue(`body.${index}.contentType`, "Image");
                    }}
                  >
                    <Image />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      setValue(`body.${index}.contentType`, "Quote");
                    }}
                  >
                    <FormatQuote />
                  </IconButton>
                  <Tooltip title="Remove Sectiion">
                    <IconButton onClick={() => remove(index)} color="secondary">
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Chip label={body?.[index]?.contentType} color="secondary" />
              </Stack>
              <Box width="auto" maxWidth="600px">
                {body?.[index]?.contentType !== "Image" ? (
                  <FormControl
                    error={errors?.body?.[index]?.content}
                    sx={{ flexGrow: 1, width: "500px" }}
                  >
                    <InputLabel>{body?.[index]?.contentType}</InputLabel>
                    <OutlinedInput
                      multiline
                      label={body?.[index]?.contentType}
                      {...register(`body.${index}.content`)}
                      placeholder="Write something"
                    />
                    <FormHelperText>
                      {errors?.body?.[index]?.content?.message}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(event) => {
                      if (event.target.files) {
                        setValue(
                          `body.${index}.content`,
                          event.target.files[0]
                        );
                      }
                    }}
                  />
                )}
              </Box>
            </Stack>
          ))}
          <Button
            sx={{ width: "max-content", maxWidth: "200px" }}
            onClick={() => {
              append({ contentType: "Paragraph", content: "" });
            }}
            variant="contained"
          >
            Add Section
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddPost;

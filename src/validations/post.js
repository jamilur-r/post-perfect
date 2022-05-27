import * as yup from "yup";

export const postValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Must enter post title")
    .min(10, "Must be atleast 10 charecter long")
    .max(40, "Must not exceed 40 character"),
  slug: yup.string().required("Must provide post url"),
  excerpt: yup.string().required("Must provide post description"),
  featuredImage: yup.mixed().required("Must provide featured image"),
  body: yup
    .array()
    .of(
      yup.object().shape({
        contentType: yup
          .string()
          .oneOf([
            "Heading 1",
            "Heading 2",
            "Heading 3",
            "Paragraph",
            "Image",
            "Quote",
          ])
          .required("Musrt select content type"),
        content: yup.mixed().required("Must prodive content"),
      })
    )
    .required("Every post Must have a body"),
});

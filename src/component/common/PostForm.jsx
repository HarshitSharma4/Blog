import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../aapwrite/config";
import { Input, Select, RTE, Button } from "../index";
import { postAdd, postupdate } from "../../store/postSlice";
function PostForm({ post }) {
  const { register, watch, handleSubmit, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  const dispatch = useDispatch();
  const submit = async (data) => {
    if (post !== undefined && post !== null) {
      const file = await service.uploadFile(data.image[0]);
      if (file) service.deleteFile(post.featureImage);
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        const updatepost = await service.getPost(data.slug);
        dispatch(postupdate(updatepost));
        navigate(`/`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await service.createPost({
          ...data,
          featureImage: file ? file.$id : undefined,
          userId: userData.$id,
        });
        if (dbPost) {
          dispatch(postAdd(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/[\s]/g, "-");
    return "";
  }, []);
  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);
  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-7">
      <Input
        label="Title :"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      <Input
        label="Slug :"
        placeholder="Slug"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultvalue={getValues("content")}
      />
      <Input
        label="FeatureImage :"
        type="file"
        accept="image/png , image/jpg, image/jpeg, image/gif"
        divClass="flex gap-7"
        className="w-auto"
        {...register("image", { required: !post })}
      />
      {post && (
        <div>
          <img
            src={service.getFilePreview(post.featureImage)}
            alt={post.title}
          />
        </div>
      )}
      <Select
        options={["active", "disable"]}
        label="Status :"
        className="shadow "
        {...register("status", { required: true })}
      />
      <Button type="submit">{post ? "Update" : "Submit"}</Button>
    </form>
  );
}

export default PostForm;

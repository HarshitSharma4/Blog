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
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const submit = async (data) => {
    console.log(profile);
    if (post !== undefined && post !== null) {
      const file = await service.uploadFile(data.image[0]);
      if (file) service.deleteFile(post.featureImage);
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
        name: post.name,
      });

      if (dbPost) {
        const updatepost = await service.getPost(data.slug);
        dispatch(postupdate(updatepost));
        navigate(`/`);
      }
    } else {
      console.log();
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const dbPost = await service.createPost({
          ...data,
          featureImage: file ? file.$id : undefined,
          userId: userData.$id,
          name: profile.username,
        });
        if (dbPost) {
          dispatch(postAdd(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      value = value.trim();
      while (/^[^a-zA-Z0-9._-]/.test(value)) {
        value = value.slice(1);
      }
      const transform = value.replace(/[^a-zA-Z0-9._-]/g, "-");
      return transform.slice(0, 36);
    }
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
    <div className="">
      {!post ? (
        <h1 className="my-5 text-center text-2xl font-bold">
          Create Your Blog
        </h1>
      ) : (
        <h1 className="my-5 text-center text-2xl font-bold">Edit Your Blog</h1>
      )}
      <form onSubmit={handleSubmit(submit)} className="space-y-7">
        <Input
          placeholder="Title"
          className=""
          {...register("title", { required: true })}
        />
        <Input
          className=""
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Write your Blog :"
          name="content"
          control={control}
          defaultvalue={getValues("content")}
        />
        <Input
          label="+ Add image : "
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
          {...register("status", { required: true })}
        />
        <Button type="submit">{post ? "Update" : "Submit"}</Button>
      </form>
    </div>
  );
}

export default PostForm;

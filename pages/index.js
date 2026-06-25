import { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import {
  AppContainer,
  Header,
  Title,
  Subtitle,
  CreatePostBox,
  TextArea,
  Button,
  FeedContainer,
  PostCard,
  PostText,
  CardFooter,
  ButtonGroup,
  TextLink,
  Timestamp,
  ErrorMessage,
  CharacterCounter,
  FlexActionRow,
  EditTextarea,
  EditActions,
  EditedLabel,
  InteractionContainer,
  LikeButton,
  UploadButton,
  HiddenFileInput,
  PreviewContainer,
  PreviewText,
  PostImage,
  UploadWrapper,
  NavBar,
  UserProfileZone,
  Avatar,
  UsernameText,
  GuestNotice,
  PostHeaderZone,
  PostAvatar,
  PostAuthorName,
} from "../components/FeedElements";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });

export default function Home() {
  const { data: session, status } = useSession();

  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/posts", fetcher);

  const [inputText, setInputText] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteErrorId, setDeleteErrorId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editError, setEditError] = useState("");

  const [userId, setUserId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewName, setImagePreviewName] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    let localId = localStorage.getItem("anonymous_user_id");
    if (!localId) {
      localId = crypto.randomUUID();
      localStorage.setItem("anonymous_user_id", localId);
    }
    setUserId(localId);
  }, []);

  const handleFileChange = (event) => {
    setUploadError("");
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size allowed is 5MB.");
      return;
    }

    setImageFile(file);
    setImagePreviewName(file.name);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewName("");
    setUploadError("");
  };

  async function handlePostSubmit() {
    if (!inputText.trim() || isSubmitting) return;
    setSubmitError("");
    setIsSubmitting(true);

    let imageUrl = "";

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryCloudName =
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) throw new Error("Cloudinary media upload failed.");

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, image: imageUrl }),
      });

      if (!response.ok) throw new Error("Server error");

      mutate();
      setInputText("");
      handleRemoveImage();
    } catch (err) {
      setSubmitError(
        "Failed to send post. Please check your network and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isButtonDisabled = !inputText.trim() || isSubmitting;

  async function handleEditSubmit(id) {
    if (!editingText.trim()) return;
    setEditError("");

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editingText }),
      });

      if (!response.ok) throw new Error("Failed to save update");

      mutate();
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      setEditError("Failed to save changes. Please try again.");
    }
  }

  async function handleLikeToggle(postId) {
    if (!userId) return;

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        mutate();
      }
    } catch (err) {
      console.error("Failed to toggle like engagement:", err);
    }
  }

  async function handleDelete(id) {
    setDeleteErrorId(null);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post permanently?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Deletion failed on the backend.");
      }

      mutate();
    } catch (err) {
      console.error("Deletion error captured:", err);
      setDeleteErrorId(id);
    }
  }
  return (
    <AppContainer>
      <NavBar>
        {status === "authenticated" ? (
          <>
            <UserProfileZone>
              <Avatar src={session.user.image} alt={session.user.name} />
              <UsernameText>{session.user.name}</UsernameText>
            </UserProfileZone>
            <Button $secondary onClick={() => signOut()}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <UsernameText>Welcome Guest</UsernameText>

            <Button onClick={() => signIn("github")}>
              Sign In with GitHub
            </Button>
          </>
        )}
      </NavBar>
      <Header>
        <Title>Social Media App</Title>
        <Subtitle>Insert inspirational quote</Subtitle>
      </Header>
      {status === "authenticated" ? (
        <CreatePostBox>
          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

          <TextArea
            placeholder="What's happening?"
            rows="3"
            maxLength={280}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            disabled={isSubmitting}
          />
          {imagePreviewName && (
            <PreviewContainer>
              <PreviewText>📎 {imagePreviewName}</PreviewText>
              <TextLink
                $danger
                onClick={handleRemoveImage}
                disabled={isSubmitting}
              >
                Remove
              </TextLink>
            </PreviewContainer>
          )}

          <FlexActionRow>
            <UploadWrapper>
              <UploadButton htmlFor="file-upload">+</UploadButton>
              <HiddenFileInput
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <CharacterCounter>{280 - inputText.length}/280</CharacterCounter>
            </UploadWrapper>
            <Button onClick={handlePostSubmit} disabled={isButtonDisabled}>
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </FlexActionRow>
        </CreatePostBox>
      ) : (
        <GuestNotice>Please sign in above to write a post.</GuestNotice>
      )}

      <FeedContainer>
        {isLoading && <p>Loading posts...</p>}
        {error && (
          <ErrorMessage>
            Failed to load posts. Please try again later.
          </ErrorMessage>
        )}

        {!isLoading && !error && (
          <>
            {posts?.length === 0 && (
              <p>No posts yet. Be the first to share your thoughts!</p>
            )}

            {posts?.map((post) => {
              const isEditingThisPost = editingId === post._id;
              const isEdited = post.createdAt !== post.updatedAt;
              const hasDeleteError = deleteErrorId === post._id;
              const hasLikedThisPost = post.likes?.includes(userId);
              const likeCount = post.likes?.length || 0;
              const isPostOwner =
                session && session.user?.email === post.userEmail;

              return (
                <PostCard key={post._id}>
                  {hasDeleteError && (
                    <ErrorMessage>
                      Could not delete post. Please try again.
                    </ErrorMessage>
                  )}
                  {isEditingThisPost ? (
                    <div>
                      {editError && <ErrorMessage>{editError}</ErrorMessage>}
                      <EditTextarea
                        rows="2"
                        maxLength={280}
                        value={editingText}
                        onChange={(event) => setEditingText(event.target.value)}
                      />
                      <EditActions>
                        <Button $secondary onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleEditSubmit(post._id)}
                          disabled={!editingText.trim()}
                        >
                          Save
                        </Button>
                      </EditActions>
                    </div>
                  ) : (
                    <>
                      {post.userImage && (
                        <PostHeaderZone>
                          <PostAvatar
                            src={post.userImage}
                            alt="Post author profile image layout"
                          />
                          {post.userName && (
                            <PostAuthorName>{post.userName}</PostAuthorName>
                          )}
                        </PostHeaderZone>
                      )}

                      <PostText>{post.text}</PostText>

                      {post.image && (
                        <PostImage
                          src={post.image}
                          alt="Uploaded post media attachment content"
                        />
                      )}
                      <CardFooter>
                        <ButtonGroup>
                          {isPostOwner && (
                            <TextLink
                              onClick={() => {
                                setEditingId(post._id);
                                setEditingText(post.text);
                                setEditError("");
                              }}
                            >
                              Edit
                            </TextLink>
                          )}

                          {isPostOwner && (
                            <TextLink
                              $danger
                              onClick={() => handleDelete(post._id)}
                            >
                              Delete
                            </TextLink>
                          )}
                          <InteractionContainer>
                            <LikeButton
                              onClick={() => handleLikeToggle(post._id)}
                              $hasLiked={hasLikedThisPost}
                            >
                              {hasLikedThisPost ? "❤️" : "🖤"} {likeCount}
                            </LikeButton>
                          </InteractionContainer>
                        </ButtonGroup>
                        <Timestamp>
                          {isEdited && <EditedLabel>(Edited)</EditedLabel>}
                          {post.createdAt
                            ? formatDistanceToNow(new Date(post.createdAt), {
                                addSuffix: true,
                              })
                            : "Just now"}
                        </Timestamp>
                      </CardFooter>
                    </>
                  )}
                </PostCard>
              );
            })}
          </>
        )}
      </FeedContainer>
    </AppContainer>
  );
}

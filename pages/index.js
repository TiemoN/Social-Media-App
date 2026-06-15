import { formatDistanceToNow } from "date-fns";
import useSWR from "swr";

import {
  AppContainer,
  Header,
  Title,
  Subtitle,
  CreatePostBox,
  TextArea,
  ActionRow,
  Button,
  FeedContainer,
  PostCard,
  PostText,
  CardFooter,
  ButtonGroup,
  TextLink,
  Timestamp,
} from "../components/FeedElements";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });

export default function Home() {
  const { data: posts, error, isLoading } = useSWR("/api/posts", fetcher);

  return (
    <AppContainer>
      {/* Header View */}
      <Header>
        <Title>Social Media App</Title>
        <Subtitle>Inspirational Quote</Subtitle>
      </Header>

      <CreatePostBox>
        <TextArea placeholder="What's happening?" rows="3" />
        <ActionRow>
          <Button disabled>Post</Button>
        </ActionRow>
      </CreatePostBox>

      <FeedContainer>
        {isLoading && <p>Loading posts...</p>}

        {error && (
          <p style={{ color: "#f4212e" }}>
            Failed to load posts. Please try again later.
          </p>
        )}

        {!isLoading && !error && posts?.length === 0 && (
          <p>No posts yet. Be the first to share your thoughts!</p>
        )}

        {!isLoading &&
          !error &&
          posts?.map((post) => {
            const displayDate = post.createdAt
              ? new Date(post.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Just now";

            return (
              <PostCard key={post._id}>
                <PostText>{post.text}</PostText>

                <CardFooter>
                  <ButtonGroup>
                    <TextLink>Edit</TextLink>
                    <TextLink $danger>Delete</TextLink>
                  </ButtonGroup>
                  <Timestamp>
                    {post.createdAt
                      ? formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </Timestamp>
                </CardFooter>
              </PostCard>
            );
          })}
      </FeedContainer>
    </AppContainer>
  );
}

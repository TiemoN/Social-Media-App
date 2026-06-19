import { formatDistanceToNow } from "date-fns";
import useSWR from "swr";
import { useState,useEffect } from "react";

import {
  AppContainer,
  Header,
  Title,
  Subtitle,
  CreatePostBox,
  TextArea,
  EditedLabel,
  Button,
  FeedContainer,
  PostCard,
  PostText,
  CardFooter,
  ButtonGroup,
  TextLink,
  Timestamp,ErrorMessage, CharacterCounter, FlexActionRow 
} from "../components/FeedElements";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
});

export default function Home() {
  const { data: posts, error, isLoading, mutate } = useSWR('/api/posts', fetcher);
  
  const [inputText, setInputText] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);


  async function handlePostSubmit() {
    if (!inputText.trim()) return;
    setSubmitError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error('Server rejected submission');

      mutate();       
      setInputText(""); 
    } catch (err) {
      setSubmitError("Failed to send post. Please check your network and try again.");
    }
  }

  const isButtonDisabled = !inputText.trim() || inputText.length > 280;
  const isOverLimit = inputText.length > 280;

  return (
    <AppContainer>
      <Header>
        <Title>Social Media App</Title>
        <Subtitle>Insert inspirational quote</Subtitle>
      </Header>

      
      <CreatePostBox>
        
        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        
        <TextArea 
          placeholder="What's happening?" 
          rows="3" 
          maxLength={280}
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        
        
        <FlexActionRow>
         
          <CharacterCounter $error={isOverLimit}>
            {280 - inputText.length}
          </CharacterCounter>
          <Button onClick={handlePostSubmit} disabled={isButtonDisabled}>
            Post
          </Button>
        </FlexActionRow>
      </CreatePostBox>

      
      <FeedContainer>
        {isLoading && <p>Loading posts...</p>}
        {error && <ErrorMessage>Failed to load posts. Please try again later.</ErrorMessage>}

        {!isLoading && !error && (
          <>
            {posts?.length === 0 && (
              <p>No posts yet. Be the first to share your thoughts!</p>
            )}

            {posts?.map((post) => (
              <PostCard key={post._id}>
                <PostText>{post.text}</PostText>
                <CardFooter>
                  <ButtonGroup>
                    <TextLink>Edit</TextLink>
                    <TextLink $danger>Delete</TextLink>
                  </ButtonGroup>
                  <Timestamp>
 
  {isEdited && <EditedLabel>(Edited)</EditedLabel>}
  
  {post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "Just now"}
</Timestamp>
                </CardFooter>
              </PostCard>
            ))}
          </>
        )}
      </FeedContainer>
    </AppContainer>
  );
}

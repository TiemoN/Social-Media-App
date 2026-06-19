import React, { useState } from 'react';
import useSWR from 'swr';
import { formatDistanceToNow } from 'date-fns';
import {
  AppContainer, Header, Title, Subtitle, CreatePostBox, TextArea, 
  Button, FeedContainer, PostCard, PostText, CardFooter, 
  ButtonGroup, TextLink, Timestamp, ErrorMessage, CharacterCounter, 
  FlexActionRow, EditTextarea, EditActions, EditedLabel
} from '../components/FeedElements';

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
});

export default function Home() {
  const { data: posts, error, isLoading, mutate } = useSWR('/api/posts', fetcher);
  
  const [inputText, setInputText] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editError, setEditError] = useState("");

  async function handlePostSubmit() {
    if (!inputText.trim()) return;
    setSubmitError("");
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) throw new Error('Server error');
      mutate();       
      setInputText(""); 
    } catch (err) {
      setSubmitError("Failed to send post. Please check your network and try again.");
    }
  }

  const isButtonDisabled = !inputText.trim();
  async function handleEditSubmit(id) {
    if (!editingText.trim()) return;
    setEditError("");

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editingText }),
      });

      if (!response.ok) throw new Error('Failed to save update');

      mutate();
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      setEditError("Failed to save changes. Please try again.");
    }
  }

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
      
          <CharacterCounter>
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

            {posts?.map((post) => {
              const isEditingThisPost = editingId === post._id;
              const isEdited = post.createdAt !== post.updatedAt;

              return (
                <PostCard key={post._id}>
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
                        <Button $secondary onClick={() => setEditingId(null)}>Cancel</Button>
                        <Button onClick={() => handleEditSubmit(post._id)} disabled={!editingText.trim()}>
                          Save
                        </Button>
                      </EditActions>
                    </div>
                  ) : (
                   
                    <>
                      <PostText>{post.text}</PostText>
                      <CardFooter>
                        <ButtonGroup>
                          <TextLink onClick={() => {
                            setEditingId(post._id);
                            setEditingText(post.text);
                            setEditError("");
                          }}>
                            Edit
                          </TextLink>
                          <TextLink $danger>Delete</TextLink>
                        </ButtonGroup>
                        <Timestamp>
                          {isEdited && <EditedLabel>(Edited)</EditedLabel>}
                          {post.createdAt
                            ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
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
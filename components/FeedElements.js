import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 100vh;
  background-color: #ffffff;
`;

export const Header = styled.header`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  color: #1d9bf0;
  font-size: 24px;
  font-weight: 800;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #536471;
  font-size: 14px;
  margin: 4px 0 0 0;
`;

export const CreatePostBox = styled.div`
  border: 1px solid #eff3f4;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font-size: 18px;
  outline: none;
  margin-bottom: 12px;
  color: #0f1419;

  &::placeholder {
    color: #536471;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eff3f4;
  padding-top: 12px;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.$secondary ? "#efefef" : "#1d9bf0")};
  color: ${(props) => (props.$secondary ? "#0f1419" : "#ffffff")};
  border: none;
  padding: 8px 18px;
  font-weight: bold;
  font-size: 15px;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.$secondary ? "#e2e2e2" : "#1a8cd8")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PostCard = styled.div`
  border: 1px solid #eff3f4;
  border-radius: 16px;
  padding: 16px;
  background-color: #ffffff;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7f9f9;
  }
`;

export const PostText = styled.p`
  color: #0f1419;
  font-size: 15px;
  line-height: 1.5;
  margin: 0 0 12px 0;
  white-space: pre-wrap;
`;

export const EditTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #1d9bf0;
  border-radius: 8px;
  padding: 8px;
  font-size: 15px;
  outline: none;
  resize: none;
  margin-bottom: 8px;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eff3f4;
  padding-top: 12px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const TextLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (props.$danger ? "#f4212e" : "#1d9bf0")};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Timestamp = styled.span`
  font-size: 13px;
  color: #536471;
`;

export const ErrorMessage = styled.p`
  color: #f4212e;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const CharacterCounter = styled.span`
  font-size: 13px;
  color: ${(props) => (props.$error ? "#f4212e" : "#536471")};
`;

export const FlexActionRow = styled(ActionRow)`
  justify-content: space-between;
  align-items: center;
`;

export const EditedLabel = styled.span`
  color: #536471;
  margin-right: 4px;
`;

export const InteractionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const LikeButton = styled(TextLink)`
  color: ${(props) => (props.$hasLiked ? "#f91880" : "#536471")};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;

  &:hover {
    color: #f91880;
    text-decoration: none;
  }
`;

export const UploadButton = styled.label`
  background-color: #efefef;
  color: #0f1419;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #e2e2e2;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f9f9;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 12px;
`;

export const PreviewText = styled.span`
  font-size: 13px;
  color: #536471;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 8px;
  border: 1px solid #eff3f4;
`;

export const UploadWrapper = styled.div`
  display: "flex";
  align-items: "center";
  gap: "12px";
`;

export const GuestNotice = styled.p`
  text-align: center;
  color: #536471;
  margin: 24px 0;
  font-size: 14px;
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eff3f4;
  margin-bottom: 24px;
`;

export const UserProfileZone = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #efefef;
`;

export const UsernameText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #0f1419;
`;

export const PostHeaderZone = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const PostAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #efefef;
`;

export const PostAuthorName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #0f1419;
`;

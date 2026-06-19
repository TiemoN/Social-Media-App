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
  color: ${props => props.$error ? '#f4212e' : '#536471'};
`;

export const FlexActionRow = styled(ActionRow)`
  justify-content: space-between;
  align-items: center;
`;

export const EditedLabel = styled.span`
  color: #536471;
  margin-right: 4px;
`;

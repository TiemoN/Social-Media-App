import styled, {keyframes} from "styled-components";

const floatLeftToRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #74c7ff 0%, #76c5f7 60%, #e0f2fe 100%);
  background-attachment: fixed;
  padding: 24px 16px;
  position: relative;
  overflow-x: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
`;

export const CloudCanvasWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

export const FloatingCloudNode = styled.div`
  position: absolute;
  background-image: url("/cloud-pattern.svg");
  background-repeat: no-repeat;
  background-size: contain;
  width: 600px;
  height: 120px;
  bottom: ${(props) => props.$bottom || "0px"};
  opacity: ${(props) => props.$opacity || "0.9"};

  animation: ${floatLeftToRight} ${(props) => props.$duration || "40s"} linear
    infinite;
  animation-delay: ${(props) => props.$delay || "0s"};
`;

export const Header = styled.header`
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  margin-top: 16px;
  margin-bottom: 24px;
  box-sizing: border-box;
`;
export const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #004891;
  margin: 0 0 6px 0;

  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #000000;
  margin: 0;
`;

export const CreatePostBox = styled.div`
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;

  width: 100%;
  max-width: 600px;

  margin-left: auto;
  margin-right: auto;

  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #eff3f4;
  border-radius: 12px;
  padding: 12px;
  font-family: inherit;
  font-size: 16px;
  resize: none;
  background-color: #ffffff;
  color: #0f1419;
  outline: none;

  box-sizing: border-box;

  &:focus {
    border-color: #1d9bf0;
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
  gap: 16px;
  margin-top: 16px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  position: relative;
  z-index: 10;
  padding-bottom: 160px;
`;

export const PostCard = styled.div`
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
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
  padding: 4px 8px;
  cursor: pointer;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition:
    background-color 0.2s,
    opacity 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$danger ? "rgba(244, 33, 46, 0.1)" : "rgba(29, 155, 240, 0.1)"};
    opacity: 0.8;
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
  color: #000000;
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

export const AudioControlBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f7f9f9;
  padding: 8px 16px;
  border-radius: 9999px;
  margin-bottom: 16px;
  width: max-content;

  margin-left: auto;
  margin-right: 0;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

export const PlayAudioButton = styled(Button)`
  padding: 6px 12px;
  font-size: 13px;
`;

export const VolumeSlider = styled.input`
  cursor: pointer;
  accent-color: #1d9bf0;
  width: 80px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(4px);
`;

export const ModalCard = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

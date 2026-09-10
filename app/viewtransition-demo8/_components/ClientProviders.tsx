import MouseTracker from "./MouseTracker";
import PhotoInformation from "./PhotoInformation";
import Modal from "./Modal";

const ClientProviders = () => {
  return (
    <>
      <Modal />
      <PhotoInformation />
      <MouseTracker />
    </>
  );
};

export default ClientProviders;

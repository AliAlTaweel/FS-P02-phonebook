const Notification = (props) => {
  return (
    <>
      {props.visible && <h1 className="notifiH">{props.message}</h1>}
    </>
  );
};
export default Notification;

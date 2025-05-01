import StoryView from "../component/StoryView";

function ShowStory(storyInfo, storyLine) {

  return (
    <>
      <div className="storyLine-box">
        {storyLine}
      </div>
      <StoryView data={storyInfo} />
    </>
  );
}

export default ShowStory;
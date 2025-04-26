import StoryView from "../component/StoryView";

function ShowStory(storyInfo, storyLine) {

  return (
    <>
      <div className="storyLine-box">
        {storyLine}
      </div>
      <StoryView info={storyInfo} />
    </>
  );
}

export default ShowStory;
import StoryView from "../component/StoryView";

function ShowStory(storyInfo, storyLine, endStoryView) {

  return (
    <>
      <div className="storyLine-box">
        {storyLine}
      </div>
      <StoryView data={storyInfo} endStoryView={endStoryView} />
    </>
  );
}

export default ShowStory;